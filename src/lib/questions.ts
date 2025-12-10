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
    question: 'Hva er hovedstaden i Norge?',
    options: {
      red: 'Bergen',
      blue: 'Oslo',
      green: 'Trondheim',
      yellow: 'Stavanger',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 2,
    question: 'Hvilket år ble Norge selvstendig fra Sverige?',
    options: {
      red: '1814',
      blue: '1900',
      green: '1905',
      yellow: '1920',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
  {
    id: 3,
    question: 'Hva heter Norges lengste elv?',
    options: {
      red: 'Glomma',
      blue: 'Drammenselva',
      green: 'Numedalslågen',
      yellow: 'Otra',
    },
    correctAnswer: 'red',
    timeLimit: 20,
  },
  {
    id: 4,
    question: 'Hvilken planet er nærmest solen?',
    options: {
      red: 'Venus',
      blue: 'Mars',
      green: 'Jupiter',
      yellow: 'Merkur',
    },
    correctAnswer: 'yellow',
    timeLimit: 20,
  },
  {
    id: 5,
    question: 'Hva er 15 × 8?',
    options: {
      red: '120',
      blue: '115',
      green: '125',
      yellow: '130',
    },
    correctAnswer: 'red',
    timeLimit: 15,
  },
  {
    id: 6,
    question: "Hvilket dyr er kjent som 'kongen av jungelen'?",
    options: {
      red: 'Tiger',
      blue: 'Elefant',
      green: 'Løve',
      yellow: 'Gorilla',
    },
    correctAnswer: 'green',
    timeLimit: 15,
  },
  {
    id: 7,
    question: 'Hva er det kjemiske symbolet for vann?',
    options: {
      red: 'O2',
      blue: 'H2O',
      green: 'CO2',
      yellow: 'NaCl',
    },
    correctAnswer: 'blue',
    timeLimit: 15,
  },
  {
    id: 8,
    question: "Hvem malte 'Skrik'?",
    options: {
      red: 'Edvard Munch',
      blue: 'Pablo Picasso',
      green: 'Vincent van Gogh',
      yellow: 'Leonardo da Vinci',
    },
    correctAnswer: 'red',
    timeLimit: 20,
  },
  {
    id: 9,
    question: 'Hvor mange dager er det i et skuddår?',
    options: {
      red: '364',
      blue: '365',
      green: '366',
      yellow: '367',
    },
    correctAnswer: 'green',
    timeLimit: 15,
  },
  {
    id: 10,
    question: 'Hva er det største havet på jorden?',
    options: {
      red: 'Atlanterhavet',
      blue: 'Stillehavet',
      green: 'Indiahavet',
      yellow: 'Nordishavet',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
]
