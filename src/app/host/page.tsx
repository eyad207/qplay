'use client'

import { useEffect, useState, useCallback } from 'react'
import { getPusherClient } from '@/lib/pusher'
import { questions } from '@/lib/questions'
import { AnswerColor, PlayerAnswer } from '@/lib/types'

interface Player {
  id: string
  name: string
}

export default function HostPage() {
  const [gameStatus, setGameStatus] = useState<
    'lobby' | 'question' | 'results' | 'finished'
  >('lobby')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [players, setPlayers] = useState<Player[]>([])
  const [answers, setAnswers] = useState<PlayerAnswer[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameCode] = useState(() =>
    Math.random().toString(36).substring(2, 8).toUpperCase()
  )

  const currentQuestion = questions[currentQuestionIndex]

  // Initialize Pusher
  useEffect(() => {
    const pusher = getPusherClient()
    const ch = pusher.subscribe(`quiz-${gameCode}`)

    ch.bind(
      'player_joined',
      (data: { playerId: string; playerName: string }) => {
        setPlayers((prev) => {
          if (prev.find((p) => p.id === data.playerId)) return prev
          return [...prev, { id: data.playerId, name: data.playerName }]
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

  // Timer countdown
  useEffect(() => {
    if (gameStatus !== 'question' || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStatus, timeLeft])

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

  const startGame = async () => {
    await sendPusherEvent('quiz_started', {})
    showQuestion(0)
  }

  const showQuestion = async (index: number) => {
    setCurrentQuestionIndex(index)
    setAnswers([])
    setGameStatus('question')
    setTimeLeft(questions[index].timeLimit)
    await sendPusherEvent('show_question', { questionIndex: index })
  }

  const showResults = async () => {
    setGameStatus('results')
    await sendPusherEvent('show_results', {
      correctAnswer: currentQuestion.correctAnswer,
    })
  }

  const nextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      showQuestion(currentQuestionIndex + 1)
    } else {
      setGameStatus('finished')
      await sendPusherEvent('quiz_finished', {})
    }
  }

  const getAnswerCount = (color: AnswerColor) => {
    return answers.filter((a) => a.answer === color).length
  }

  const colorClasses = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-400',
  }

  const colorLabels = {
    red: '🔴',
    blue: '🔵',
    green: '🟢',
    yellow: '🟡',
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white'>
      {/* Header */}
      <header className='flex justify-between items-center p-4 bg-black/20'>
        <h1 className='text-3xl font-bold'>Qplay</h1>
        <div className='flex items-center gap-4'>
          <div className='bg-white/20 px-4 py-2 rounded-lg'>
            <span className='text-sm opacity-70'>Kode: </span>
            <span className='font-mono font-bold text-xl'>{gameCode}</span>
          </div>
          <div className='bg-white/20 px-4 py-2 rounded-lg'>
            👥 {players.length} spillere
          </div>
        </div>
      </header>

      <main className='container mx-auto p-8'>
        {/* Lobby */}
        {gameStatus === 'lobby' && (
          <div className='text-center'>
            <div className='bg-white/10 rounded-2xl p-12 mb-8'>
              <h2 className='text-2xl mb-4'>Koble til på mobilen:</h2>
              <p className='text-lg opacity-70 mb-4'>
                Gå til{' '}
                <span className='font-mono bg-black/30 px-2 py-1 rounded'>
                  /play
                </span>{' '}
                og skriv inn koden:
              </p>
              <div className='text-8xl font-mono font-bold tracking-wider my-8'>
                {gameCode}
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
              <div className='mb-8'>
                <h3 className='text-xl mb-4'>Spillere:</h3>
                <div className='flex flex-wrap justify-center gap-2'>
                  {players.map((player) => (
                    <span
                      key={player.id}
                      className='bg-white/20 px-4 py-2 rounded-full'
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
              className='bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white text-2xl font-bold px-12 py-4 rounded-xl transition-all transform hover:scale-105'
            >
              Start Quiz!
            </button>
          </div>
        )}

        {/* Question */}
        {gameStatus === 'question' && currentQuestion && (
          <div>
            <div className='flex justify-between items-center mb-8'>
              <span className='text-xl opacity-70'>
                Spørsmål {currentQuestionIndex + 1} / {questions.length}
              </span>
              <div className='flex items-center gap-4'>
                <span className='text-xl'>
                  {answers.length} / {players.length} har svart
                </span>
                <div
                  className={`text-4xl font-bold ${
                    timeLeft <= 5 ? 'text-red-400 animate-pulse' : ''
                  }`}
                >
                  ⏱️ {timeLeft}s
                </div>
              </div>
            </div>

            <div className='bg-white/10 rounded-2xl p-12 mb-8 text-center'>
              <h2 className='text-4xl font-bold'>{currentQuestion.question}</h2>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              {(Object.keys(currentQuestion.options) as AnswerColor[]).map(
                (color) => (
                  <div
                    key={color}
                    className={`${colorClasses[color]} rounded-xl p-8 text-center`}
                  >
                    <span className='text-3xl mr-4'>{colorLabels[color]}</span>
                    <span className='text-2xl font-bold'>
                      {currentQuestion.options[color]}
                    </span>
                  </div>
                )
              )}
            </div>

            <div className='text-center mt-8'>
              <button
                onClick={showResults}
                className='bg-white/20 hover:bg-white/30 text-white text-xl font-bold px-8 py-3 rounded-xl transition-all'
              >
                Vis fasit →
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {gameStatus === 'results' && currentQuestion && (
          <div>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold mb-4'>
                {currentQuestion.question}
              </h2>
              <p className='text-xl opacity-70'>
                Riktig svar:{' '}
                <span className='font-bold'>
                  {currentQuestion.options[currentQuestion.correctAnswer]}
                </span>
              </p>
            </div>

            <div className='grid grid-cols-2 gap-4 mb-8'>
              {(Object.keys(currentQuestion.options) as AnswerColor[]).map(
                (color) => {
                  const isCorrect = color === currentQuestion.correctAnswer
                  const count = getAnswerCount(color)

                  return (
                    <div
                      key={color}
                      className={`${colorClasses[color]} ${
                        isCorrect ? 'ring-4 ring-white scale-105' : 'opacity-50'
                      } rounded-xl p-8 text-center transition-all`}
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

            <div className='text-center'>
              <button
                onClick={nextQuestion}
                className='bg-green-500 hover:bg-green-600 text-white text-2xl font-bold px-12 py-4 rounded-xl transition-all transform hover:scale-105'
              >
                {currentQuestionIndex < questions.length - 1
                  ? 'Neste spørsmål →'
                  : 'Avslutt quiz'}
              </button>
            </div>
          </div>
        )}

        {/* Finished */}
        {gameStatus === 'finished' && (
          <div className='text-center'>
            <div className='bg-white/10 rounded-2xl p-12'>
              <h2 className='text-5xl font-bold mb-4'>🎉 Quiz ferdig!</h2>
              <p className='text-2xl opacity-70 mb-8'>
                Takk for at dere spilte!
              </p>
              <p className='text-xl'>{players.length} spillere deltok</p>
              <button
                onClick={() => window.location.reload()}
                className='mt-8 bg-purple-500 hover:bg-purple-600 text-white text-xl font-bold px-8 py-3 rounded-xl transition-all'
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
