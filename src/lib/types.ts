export type AnswerColor = 'red' | 'blue' | 'green' | 'yellow'

export interface PlayerAnswer {
  playerId: string
  answer: AnswerColor
  timestamp: number
}

export interface GameState {
  status: 'waiting' | 'question' | 'results' | 'finished'
  currentQuestionIndex: number
  playerCount: number
  answers: PlayerAnswer[]
}

export interface PusherEvents {
  // Host -> Players
  quiz_started: Record<string, never>
  show_question: { questionIndex: number }
  show_results: { correctAnswer: AnswerColor }
  quiz_finished: Record<string, never>

  // Players -> Host
  player_joined: { playerId: string; playerName: string }
  player_answered: { playerId: string; answer: AnswerColor }
  player_left: { playerId: string }
}
