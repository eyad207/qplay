'use client'

import { useEffect, useState, useCallback } from 'react'
import { getPusherClient } from '@/lib/pusher'
import { AnswerColor } from '@/lib/types'
import type { Channel } from 'pusher-js'

export default function PlayPage() {
  const [gameCode, setGameCode] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [playerId] = useState(() => Math.random().toString(36).substring(2, 10))
  const [channel, setChannel] = useState<Channel | null>(null)
  const [gameStatus, setGameStatus] = useState<
    'join' | 'waiting' | 'question' | 'answered' | 'result' | 'finished'
  >('join')
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerColor | null>(null)
  const [correctAnswer, setCorrectAnswer] = useState<AnswerColor | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const sendPusherEvent = useCallback(
    async (event: string, data: Record<string, unknown>) => {
      if (!gameCode) return
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

  const joinGame = async () => {
    if (!gameCode.trim() || !playerName.trim()) return

    const code = gameCode.toUpperCase()
    const pusher = getPusherClient()
    const ch = pusher.subscribe(`quiz-${code}`)
    setChannel(ch)
    setGameCode(code)

    ch.bind('pusher:subscription_succeeded', () => {
      setIsConnected(true)
      sendPusherEvent('player_joined', {
        playerId,
        playerName: playerName.trim(),
      })
      setGameStatus('waiting')
    })

    ch.bind('quiz_started', () => {
      setGameStatus('waiting')
    })

    ch.bind('show_question', () => {
      setGameStatus('question')
      setSelectedAnswer(null)
      setCorrectAnswer(null)
    })

    ch.bind('show_results', (data: { correctAnswer: AnswerColor }) => {
      setCorrectAnswer(data.correctAnswer)
      setGameStatus('result')
    })

    ch.bind('quiz_finished', () => {
      setGameStatus('finished')
    })
  }

  // Re-attach event handlers when channel or gameCode changes
  useEffect(() => {
    if (!channel || !isConnected) return

    // Send join event after connection
    sendPusherEvent('player_joined', {
      playerId,
      playerName: playerName.trim(),
    })
  }, [isConnected, channel, playerId, playerName, sendPusherEvent])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (channel) {
        sendPusherEvent('player_left', { playerId })
        channel.unbind_all()
      }
    }
  }, [channel, playerId, sendPusherEvent])

  const submitAnswer = async (color: AnswerColor) => {
    setSelectedAnswer(color)
    setGameStatus('answered')
    await sendPusherEvent('player_answered', {
      playerId,
      answer: color,
    })
  }

  const colorButtons: { color: AnswerColor; bgClass: string; emoji: string }[] =
    [
      { color: 'red', bgClass: 'bg-red-500 active:bg-red-600', emoji: '🔴' },
      { color: 'blue', bgClass: 'bg-blue-500 active:bg-blue-600', emoji: '🔵' },
      {
        color: 'green',
        bgClass: 'bg-green-500 active:bg-green-600',
        emoji: '🟢',
      },
      {
        color: 'yellow',
        bgClass: 'bg-yellow-400 active:bg-yellow-500',
        emoji: '🟡',
      },
    ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white flex flex-col'>
      {/* Join Screen */}
      {gameStatus === 'join' && (
        <div className='flex-1 flex flex-col items-center justify-center p-8'>
          <h1 className='text-4xl font-bold mb-8'>Qplay</h1>
          <div className='w-full max-w-sm space-y-4'>
            <input
              type='text'
              placeholder='Skriv inn koden'
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value.toUpperCase())}
              className='w-full text-center text-2xl font-mono p-4 rounded-xl bg-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50'
              maxLength={6}
            />
            <input
              type='text'
              placeholder='Ditt navn'
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className='w-full text-center text-xl p-4 rounded-xl bg-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50'
              maxLength={20}
            />
            <button
              onClick={joinGame}
              disabled={!gameCode.trim() || !playerName.trim()}
              className='w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white text-xl font-bold py-4 rounded-xl transition-all'
            >
              Bli med! 🎮
            </button>
          </div>
        </div>
      )}

      {/* Waiting Screen */}
      {gameStatus === 'waiting' && (
        <div className='flex-1 flex flex-col items-center justify-center p-8'>
          <div className='text-center'>
            <div className='text-6xl mb-4'>⏳</div>
            <h2 className='text-2xl font-bold mb-2'>Hei, {playerName}!</h2>
            <p className='text-xl opacity-70'>Venter på at quizen starter...</p>
          </div>
        </div>
      )}

      {/* Question Screen - Color Buttons */}
      {gameStatus === 'question' && (
        <div className='flex-1 grid grid-cols-2 gap-2 p-2'>
          {colorButtons.map(({ color, bgClass, emoji }) => (
            <button
              key={color}
              onClick={() => submitAnswer(color)}
              className={`${bgClass} rounded-2xl flex items-center justify-center text-6xl transition-transform active:scale-95`}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Answered Screen */}
      {gameStatus === 'answered' && (
        <div className='flex-1 flex flex-col items-center justify-center p-8'>
          <div className='text-center'>
            <div className='text-6xl mb-4'>✓</div>
            <h2 className='text-2xl font-bold mb-2'>Svar registrert!</h2>
            <p className='text-xl opacity-70'>Venter på resultatet...</p>
            <div className='mt-8'>
              <span className='text-4xl'>
                {colorButtons.find((b) => b.color === selectedAnswer)?.emoji}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Result Screen */}
      {gameStatus === 'result' && (
        <div className='flex-1 flex flex-col items-center justify-center p-8'>
          <div className='text-center'>
            {selectedAnswer === correctAnswer ? (
              <>
                <div className='text-8xl mb-4'>🎉</div>
                <h2 className='text-3xl font-bold text-green-400'>Riktig!</h2>
              </>
            ) : (
              <>
                <div className='text-8xl mb-4'>😔</div>
                <h2 className='text-3xl font-bold text-red-400'>Feil!</h2>
                <p className='text-xl opacity-70 mt-4'>
                  Riktig svar:{' '}
                  {colorButtons.find((b) => b.color === correctAnswer)?.emoji}
                </p>
              </>
            )}
            <p className='text-lg opacity-70 mt-8'>
              Venter på neste spørsmål...
            </p>
          </div>
        </div>
      )}

      {/* Finished Screen */}
      {gameStatus === 'finished' && (
        <div className='flex-1 flex flex-col items-center justify-center p-8'>
          <div className='text-center'>
            <div className='text-8xl mb-4'>🏆</div>
            <h2 className='text-3xl font-bold mb-4'>Quiz ferdig!</h2>
            <p className='text-xl opacity-70'>Takk for at du spilte!</p>
            <button
              onClick={() => window.location.reload()}
              className='mt-8 bg-purple-500 hover:bg-purple-600 text-white text-xl font-bold px-8 py-3 rounded-xl transition-all'
            >
              Spill igjen
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
