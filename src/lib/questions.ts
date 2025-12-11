export interface Question {
  id: number
  question: string
  options: {
    red: string
    blue: string
    green: string
    yellow: string
  }
  correctAnswer: 'red' | 'blue' | 'green' | 'yellow'
  timeLimit: number // seconds
}

export const questions: Question[] = [
  {
    id: 1,
    question: 'Hva er hovedstaden i Frankrike?',
    options: {
      red: 'London',
      blue: 'Paris',
      green: 'Berlin',
      yellow: 'Roma',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 2,
    question: 'Hvilket år startet første verdenskrig?',
    options: {
      red: '1912',
      blue: '1914',
      green: '1916',
      yellow: '1918',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 3,
    question: 'Hva er det største dyret på jorden?',
    options: {
      red: 'Elefant',
      blue: 'Blåhval',
      green: 'Tyrannosaurus rex',
      yellow: 'Giraff',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 4,
    question: 'Hvilken planet er kjent som den røde planeten?',
    options: {
      red: 'Venus',
      blue: 'Mars',
      green: 'Jupiter',
      yellow: 'Saturn',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 5,
    question: 'Hva er 12 × 9?',
    options: {
      red: '108',
      blue: '109',
      green: '110',
      yellow: '111',
    },
    correctAnswer: 'red',
    timeLimit: 15,
  },
  {
    id: 6,
    question: 'Hvilket dyr er det raskeste på land?',
    options: {
      red: 'Løve',
      blue: 'Gepard',
      green: 'Tiger',
      yellow: 'Hund',
    },
    correctAnswer: 'blue',
    timeLimit: 15,
  },
  {
    id: 7,
    question: 'Hva er det kjemiske symbolet for gull?',
    options: {
      red: 'Au',
      blue: 'Ag',
      green: 'Fe',
      yellow: 'Cu',
    },
    correctAnswer: 'red',
    timeLimit: 15,
  },
  {
    id: 8,
    question: 'Hvem skrev "Romeo og Julie"?',
    options: {
      red: 'William Shakespeare',
      blue: 'Charles Dickens',
      green: 'Jane Austen',
      yellow: 'Mark Twain',
    },
    correctAnswer: 'red',
    timeLimit: 20,
  },
  {
    id: 9,
    question: 'Hvor mange kontinenter finnes det?',
    options: {
      red: '5',
      blue: '6',
      green: '7',
      yellow: '8',
    },
    correctAnswer: 'green',
    timeLimit: 15,
  },
  {
    id: 10,
    question: 'Hva er det største landet i verden etter areal?',
    options: {
      red: 'Kina',
      blue: 'USA',
      green: 'Russland',
      yellow: 'Canada',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
]
