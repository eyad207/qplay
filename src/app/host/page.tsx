'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { getPusherClient } from '@/lib/pusher'
import { questions } from '@/lib/questions'
import { AnswerColor, PlayerAnswer } from '@/lib/types'
import QRCode from 'react-qr-code'

interface Player {
  id: string
  name: string
  score: number
}

export default function HostPage() {
  const [gameStatus, setGameStatus] = useState<
    'lobby' | 'question' | 'results' | 'scoreboard' | 'finished'
  >('lobby')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [players, setPlayers] = useState<Player[]>([])
  const [answers, setAnswers] = useState<PlayerAnswer[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameCode, setGameCode] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  // Generate game code on client side to avoid hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGameCode((Math.floor(Math.random() * 900000) + 100000).toString())
  }, [])

  // Audio refs
  const ongoingSoundRef = useRef<HTMLAudioElement | null>(null)
  const roundFinishedSoundRef = useRef<HTMLAudioElement | null>(null)
  const winSoundRef = useRef<HTMLAudioElement | null>(null)

  const currentQuestion = questions[currentQuestionIndex]

  // Initialize audio
  useEffect(() => {
    ongoingSoundRef.current = new Audio('/sounds/ongoing.mp3')
    roundFinishedSoundRef.current = new Audio('/sounds/RoundFinished.mp3')
    winSoundRef.current = new Audio('/sounds/win.mp3')
  }, [])

  // Play sound effect
  const playSound = (sound: 'ongoing' | 'roundFinished' | 'win' | 'pop') => {
    try {
      if (sound === 'ongoing' && ongoingSoundRef.current) {
        ongoingSoundRef.current.currentTime = 0
        ongoingSoundRef.current.loop = true
        ongoingSoundRef.current.play()
      } else if (sound === 'roundFinished' && roundFinishedSoundRef.current) {
        roundFinishedSoundRef.current.currentTime = 0
        roundFinishedSoundRef.current.play()
      } else if (sound === 'win' && winSoundRef.current) {
        winSoundRef.current.currentTime = 0
        winSoundRef.current.play()
      } else if (sound === 'pop') {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext ||
          (
            window as typeof window & {
              webkitAudioContext: typeof AudioContext
            }
          ).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = 800
        oscillator.type = 'sine'

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.1
        )

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      }
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }

  // Stop sound effect
  const stopSound = (sound: 'ongoing') => {
    try {
      if (sound === 'ongoing' && ongoingSoundRef.current) {
        ongoingSoundRef.current.pause()
        ongoingSoundRef.current.currentTime = 0
      }
    } catch (error) {
      console.error('Error stopping sound:', error)
    }
  }

  // Initialize Pusher
  useEffect(() => {
    const pusher = getPusherClient()
    const ch = pusher.subscribe(`quiz-${gameCode}`)

    ch.bind(
      'player_joined',
      (data: { playerId: string; playerName: string }) => {
        setPlayers((prev) => {
          if (prev.find((p) => p.id === data.playerId)) return prev
          playSound('pop')
          return [
            ...prev,
            { id: data.playerId, name: data.playerName, score: 0 },
          ]
        })
      }
    )

    ch.bind(
      'player_answered',
      (data: { playerId: string; answer: AnswerColor }) => {
        setAnswers((prev) => {
          if (prev.find((a) => a.playerId === data.playerId)) return prev
          return [...prev, { ...data, timestamp: Date.now() }]
        })
      }
    )

    ch.bind('player_left', (data: { playerId: string }) => {
      setPlayers((prev) => prev.filter((p) => p.id !== data.playerId))
    })

    return () => {
      ch.unbind_all()
      pusher.unsubscribe(`quiz-${gameCode}`)
    }
  }, [gameCode])

  const sendPusherEvent = useCallback(
    async (event: string, data: Record<string, unknown>) => {
      await fetch('/api/pusher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: `quiz-${gameCode}`,
          event,
          data,
        }),
      })
    },
    [gameCode]
  )

  const showResults = useCallback(async () => {
    setGameStatus('results')
    stopSound('ongoing')
    await sendPusherEvent('show_results', {
      correctAnswer: currentQuestion.correctAnswer,
    })
    playSound('roundFinished')

    // Update scores
    setPlayers((prev) =>
      prev.map((player) => {
        const playerAnswer = answers.find((a) => a.playerId === player.id)
        if (
          playerAnswer &&
          playerAnswer.answer === currentQuestion.correctAnswer
        ) {
          // Award points based on speed (max 1000 points)
          const maxTime = currentQuestion.timeLimit * 1000
          const timeTaken =
            playerAnswer.timestamp - (Date.now() - timeLeft * 1000)
          const speedBonus = Math.max(
            0,
            Math.floor((1 - timeTaken / maxTime) * 500)
          )
          return { ...player, score: player.score + 500 + speedBonus }
        }
        return player
      })
    )
  }, [currentQuestion, answers, timeLeft, sendPusherEvent])

  // Timer countdown
  useEffect(() => {
    if (gameStatus !== 'question' || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Auto-show results when time runs out
          setTimeout(() => showResults(), 500)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStatus, timeLeft, showResults])

  // Check if all players have answered
  useEffect(() => {
    if (
      gameStatus === 'question' &&
      players.length > 0 &&
      answers.length === players.length
    ) {
      // All players have answered - auto-show results
      const timeout = setTimeout(() => {
        playSound('roundFinished')
        showResults()
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [answers.length, players.length, gameStatus, showResults])

  const startGame = async () => {
    await sendPusherEvent('quiz_started', {})
    showQuestion(0)
  }

  const showQuestion = async (index: number) => {
    setCurrentQuestionIndex(index)
    setAnswers([])
    setGameStatus('question')
    setTimeLeft(questions[index].timeLimit)
    setShowOptions(false)
    setTimeout(() => setShowOptions(true), 4000)
    await sendPusherEvent('show_question', { questionIndex: index })
    playSound('ongoing')
  }

  const showScoreboardScreen = () => {
    setGameStatus('scoreboard')
  }

  const nextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      showQuestion(currentQuestionIndex + 1)
    } else {
      setGameStatus('finished')
      await sendPusherEvent('quiz_finished', {})
      playSound('win')
    }
  }

  const getAnswerCount = (color: AnswerColor) => {
    return answers.filter((a) => a.answer === color).length
  }

  const getSortedPlayers = () => {
    return [...players].sort((a, b) => b.score - a.score)
  }

  const colorClasses = {
    red: 'bg-linear-to-br from-red-500 to-red-600',
    blue: 'bg-linear-to-br from-blue-500 to-blue-600',
    green: 'bg-linear-to-br from-green-500 to-green-600',
    yellow: 'bg-linear-to-br from-yellow-400 to-yellow-500',
  }

  const colorLabels = {
    red: '🔴',
    blue: '🔵',
    green: '🟢',
    yellow: '🟡',
  }

  const podiumColors = [
    'from-yellow-400 to-orange-500', // 1st
    'from-gray-300 to-gray-400', // 2nd
    'from-orange-600 to-orange-700', // 3rd
  ]

  // Don't render until game code is generated
  if (!gameCode) {
    return (
      <div className='min-h-screen bg-linear-to-br from-indigo-900 via-blue-900 to-cyan-900 text-white flex items-center justify-center'>
        <div className='text-2xl'>Laster...</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-indigo-900 via-blue-900 to-cyan-900 text-white'>
      {/* Header */}
      <header className='flex justify-between items-center p-4 bg-black/30 backdrop-blur-sm'>
        <h1 className='text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
          Qplay
        </h1>
        <div className='flex items-center gap-4'>
          <div className='bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm'>
            <span className='text-sm opacity-70'>Kode: </span>
            <span className='font-mono font-bold text-xl'>{gameCode}</span>
          </div>
          <div className='bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm'>
            👥 {players.length} spillere
          </div>
        </div>
      </header>

      <main className='container mx-auto p-8'>
        {/* Lobby */}
        {gameStatus === 'lobby' && (
          <div className='text-center animate-fade-in'>
            <div className='bg-white/10 backdrop-blur-md rounded-2xl p-12 mb-8 border border-white/20'>
              <h2 className='text-2xl mb-4'>Koble til på mobilen:</h2>
              <p className='text-lg opacity-70 mb-4'>
                Skann QR-koden for å bli med:
              </p>
              <div className='w-full flex justify-center'>
                <div className='flex justify-center w-fit mb-4 bg-white p-4 rounded-xl'>
                  <QRCode
                    value={`${process.env.NEXT_PUBLIC_BASE_URL}/play?code=${gameCode}`}
                  />
                </div>
              </div>

              <div className='text-xl opacity-70'>
                {players.length === 0
                  ? 'Venter på spillere...'
                  : `${players.length} spiller${
                      players.length !== 1 ? 'e' : ''
                    } klar`}
              </div>
            </div>

            {players.length > 0 && (
              <div className='mb-8 animate-slide-up'>
                <h3 className='text-xl mb-4'>Spillere:</h3>
                <div className='flex flex-wrap justify-center gap-2'>
                  {players.map((player, idx) => (
                    <span
                      key={player.id}
                      className='bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-full transform hover:scale-110 transition-all shadow-lg'
                      style={{
                        animationDelay: `${idx * 0.1}s`,
                        animation: 'bounce-in 0.5s ease-out forwards',
                      }}
                    >
                      {player.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={startGame}
              disabled={players.length === 0}
              className='bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white text-2xl font-bold px-12 py-4 rounded-xl transition-all transform hover:scale-105 shadow-2xl'
            >
              Start Quiz!
            </button>
          </div>
        )}

        {/* Question */}
        {gameStatus === 'question' && currentQuestion && (
          <div className='animate-fade-in'>
            <div className='flex justify-between items-center mb-8'>
              <span className='text-xl opacity-70'>
                Spørsmål {currentQuestionIndex + 1} / {questions.length}
              </span>
              <div className='flex items-center gap-4'>
                <span className='text-xl bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm'>
                  {answers.length} / {players.length} har svart
                </span>
                <div
                  className={`text-4xl font-bold px-6 py-3 rounded-xl backdrop-blur-sm ${
                    timeLeft <= 5
                      ? 'bg-red-500/50 animate-pulse scale-110'
                      : 'bg-white/20'
                  } transition-all`}
                >
                  ⏱️ {timeLeft}s
                </div>
              </div>
            </div>

            {!showOptions ? (
              <div className='min-h-screen flex items-center justify-center pb-70'>
                <div className='bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center border border-white/20 animate-bounce-in'>
                  <h2 className='text-6xl font-bold'>
                    {currentQuestion.question}
                  </h2>
                </div>
              </div>
            ) : (
              <div className='bg-white/10 backdrop-blur-md rounded-2xl p-12 mb-8 text-center border border-white/20 animate-bounce-in'>
                <h2 className='text-4xl font-bold'>
                  {currentQuestion.question}
                </h2>
              </div>
            )}

            {showOptions && (
              <div className='grid grid-cols-2 gap-4'>
                {(Object.keys(currentQuestion.options) as AnswerColor[]).map(
                  (color, idx) => (
                    <div
                      key={color}
                      className={`${colorClasses[color]} rounded-xl p-8 text-center shadow-2xl transform hover:scale-105 transition-all`}
                      style={{
                        animationDelay: `${idx * 0.1}s`,
                        animation: 'slide-in 0.5s ease-out forwards',
                      }}
                    >
                      <span className='text-3xl mr-4'>
                        {colorLabels[color]}
                      </span>
                      <span className='text-2xl font-bold'>
                        {currentQuestion.options[color]}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}

            {showOptions && (
              <div className='text-center mt-8'>
                <button
                  onClick={showResults}
                  className='bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xl font-bold px-8 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg'
                >
                  Vis fasit →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {gameStatus === 'results' && currentQuestion && (
          <div className='animate-fade-in'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold mb-4'>
                {currentQuestion.question}
              </h2>
              <p className='text-xl opacity-70'>
                Riktig svar:{' '}
                <span className='font-bold text-green-400 animate-pulse'>
                  {currentQuestion.options[currentQuestion.correctAnswer]}
                </span>
              </p>
            </div>

            <div className='grid grid-cols-2 gap-4 mb-8'>
              {(Object.keys(currentQuestion.options) as AnswerColor[]).map(
                (color, idx) => {
                  const isCorrect = color === currentQuestion.correctAnswer
                  const count = getAnswerCount(color)

                  return (
                    <div
                      key={color}
                      className={`${colorClasses[color]} ${
                        isCorrect
                          ? 'ring-4 ring-green-400 scale-105 animate-pulse'
                          : 'opacity-50'
                      } rounded-xl p-8 text-center transition-all shadow-2xl`}
                      style={{
                        animationDelay: `${idx * 0.1}s`,
                        animation: isCorrect
                          ? 'bounce-in 0.6s ease-out'
                          : 'fade-in 0.5s ease-out',
                      }}
                    >
                      <div className='text-3xl mb-2'>
                        {colorLabels[color]} {isCorrect && '✓'}
                      </div>
                      <div className='text-2xl font-bold'>
                        {currentQuestion.options[color]}
                      </div>
                      <div className='text-xl mt-2 opacity-80'>
                        {count} svar
                      </div>
                    </div>
                  )
                }
              )}
            </div>

            <div className='text-center space-x-4'>
              <button
                onClick={showScoreboardScreen}
                className='bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-2xl font-bold px-12 py-4 rounded-xl transition-all transform hover:scale-105 shadow-2xl'
              >
                📊 Vis stillingen
              </button>
            </div>
          </div>
        )}

        {/* Scoreboard */}
        {gameStatus === 'scoreboard' && (
          <div className='animate-fade-in'>
            <div className='text-center mb-12'>
              <h2 className='text-5xl font-bold mb-4 bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-pulse'>
                🏆 Stillingen 🏆
              </h2>
              <p className='text-xl opacity-70'>
                Etter spørsmål {currentQuestionIndex + 1} av {questions.length}
              </p>
            </div>

            <div className='max-w-4xl mx-auto space-y-4 mb-8'>
              {getSortedPlayers().map((player, idx) => (
                <div
                  key={player.id}
                  className={`
                    ${
                      idx < 3
                        ? `bg-linear-to-r ${podiumColors[idx]}`
                        : 'bg-white/10 backdrop-blur-sm'
                    }
                    rounded-2xl p-6 flex items-center justify-between
                    transform hover:scale-105 transition-all shadow-2xl
                    border-2 ${
                      idx === 0
                        ? 'border-yellow-400'
                        : idx === 1
                        ? 'border-gray-300'
                        : idx === 2
                        ? 'border-orange-600'
                        : 'border-white/20'
                    }
                  `}
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                    animation: 'slide-in-right 0.5s ease-out forwards',
                  }}
                >
                  <div className='flex items-center gap-6'>
                    <div
                      className={`text-5xl font-bold ${
                        idx < 3 ? 'text-white' : 'text-cyan-400'
                      }`}
                    >
                      {idx === 0
                        ? '🥇'
                        : idx === 1
                        ? '🥈'
                        : idx === 2
                        ? '🥉'
                        : `#${idx + 1}`}
                    </div>
                    <div>
                      <div className='text-2xl font-bold'>{player.name}</div>
                      <div className='text-lg opacity-80'>
                        {player.score} poeng
                      </div>
                    </div>
                  </div>
                  <div className='text-4xl font-bold'>{player.score}</div>
                </div>
              ))}
            </div>

            <div className='text-center'>
              <button
                onClick={nextQuestion}
                className='bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl font-bold px-12 py-4 rounded-xl transition-all transform hover:scale-105 shadow-2xl'
              >
                {currentQuestionIndex < questions.length - 1
                  ? 'Neste spørsmål →'
                  : 'Se vinneren! 🎉'}
              </button>
            </div>
          </div>
        )}

        {/* Finished */}
        {gameStatus === 'finished' && (
          <div className='text-center animate-fade-in'>
            <div className='bg-linear-to-br from-yellow-400 via-orange-500 to-pink-600 rounded-2xl p-12 mb-8 shadow-2xl border-4 border-white/50'>
              <h2 className='text-6xl font-bold mb-8 animate-bounce'>
                🎉 Quiz ferdig! 🎉
              </h2>

              {getSortedPlayers().length > 0 && (
                <div className='bg-white/20 backdrop-blur-md rounded-xl p-8 mb-8'>
                  <h3 className='text-4xl font-bold mb-6 text-yellow-300'>
                    🏆 Vinneren er 🏆
                  </h3>
                  <div className='bg-linear-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 transform scale-110 animate-pulse shadow-2xl'>
                    <div className='text-5xl font-bold mb-2'>
                      {getSortedPlayers()[0].name}
                    </div>
                    <div className='text-3xl font-bold'>
                      {getSortedPlayers()[0].score} poeng
                    </div>
                  </div>
                </div>
              )}

              <div className='bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8'>
                <h3 className='text-2xl font-bold mb-4'>Top 3:</h3>
                <div className='space-y-3'>
                  {getSortedPlayers()
                    .slice(0, 3)
                    .map((player, idx) => (
                      <div
                        key={player.id}
                        className='flex justify-between items-center bg-white/10 rounded-lg p-4'
                        style={{
                          animationDelay: `${idx * 0.2}s`,
                          animation: 'bounce-in 0.6s ease-out forwards',
                        }}
                      >
                        <span className='text-2xl'>
                          {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}{' '}
                          {player.name}
                        </span>
                        <span className='text-xl font-bold'>
                          {player.score} poeng
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <p className='text-2xl opacity-90 mb-4'>
                Takk for at dere spilte!
              </p>
              <p className='text-xl opacity-75'>
                {players.length} spillere deltok
              </p>

              <button
                onClick={() => window.location.reload()}
                className='mt-8 bg-linear-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white text-xl font-bold px-8 py-3 rounded-xl transition-all transform hover:scale-105 shadow-2xl'
              >
                Start ny quiz
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
