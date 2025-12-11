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
    question: 'Hvilket land er kjent for retten "sushi"?',
    options: {
      red: 'Kina',
      blue: 'Japan',
      green: 'Sør-Korea',
      yellow: 'Thailand',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 2,
    question: 'Hvilket språk har flest morsmålstalere i verden?',
    options: {
      red: 'Engelsk',
      blue: 'Spansk',
      green: 'Mandarin (kinesisk)',
      yellow: 'Hindi',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
  {
    id: 3,
    question: 'Hvor kommer retten «falafel» opprinnelig fra?',
    options: {
      red: 'India',
      blue: 'Egypt',
      green: 'Libanon',
      yellow: 'Iran',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 4,
    question: 'Hvilket land drikker mest te per innbygger?',
    options: {
      red: 'Kina',
      blue: 'Iran',
      green: 'Tyrkia',
      yellow: 'India',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
  {
    id: 5,
    question: 'Hvilket land kommer dansen "dabke" fra?',
    options: {
      red: 'Marokko',
      blue: 'Syria/Libanon/Palestina-området',
      green: 'Tyrkia',
      yellow: 'Saudi-Arabia',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 6,
    question: 'Hvilket land er kjent for retten "tacos"?',
    options: {
      red: 'Spania',
      blue: 'Mexico',
      green: 'Chile',
      yellow: 'Brasil',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 7,
    question: 'Hvilket språk snakkes det mest av i Sør-Amerika?',
    options: {
      red: 'Portugisisk',
      blue: 'Fransk',
      green: 'Spansk',
      yellow: 'Engelsk',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
  {
    id: 8,
    question: 'Hvilket land er kjent for Bollywood-filmer?',
    options: {
      red: 'Pakistan',
      blue: 'India',
      green: 'Bangladesh',
      yellow: 'Nepal',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 9,
    question: 'Hva er tradisjonell norsk mat?',
    options: {
      red: 'Sushi',
      blue: 'Tacos',
      green: 'Fårikål',
      yellow: 'Couscous',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
  {
    id: 10,
    question: 'Hvilket land er kjent for å lage couscous?',
    options: {
      red: 'Egypt',
      blue: 'Marokko',
      green: 'India',
      yellow: 'Libanon',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 11,
    question: 'Hvilket land oppfant sjakk?',
    options: {
      red: 'India',
      blue: 'Kina',
      green: 'Persia',
      yellow: 'Russland',
    },
    correctAnswer: 'red',
    timeLimit: 20,
  },
  {
    id: 12,
    question: 'Hva er det offisielle språket i Brasil?',
    options: {
      red: 'Spansk',
      blue: 'Portugisisk',
      green: 'Fransk',
      yellow: 'Engelsk',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 13,
    question: 'Hvilket land oppfant papir?',
    options: {
      red: 'India',
      blue: 'Japan',
      green: 'Kina',
      yellow: 'Iran',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
  {
    id: 14,
    question: 'Hvilket land er kjent for den tradisjonelle retten «pho»?',
    options: {
      red: 'Thailand',
      blue: 'Vietnam',
      green: 'Japan',
      yellow: 'Indonesia',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 15,
    question:
      'Hva heter retten med ris og rå fisk som ofte serveres i ruller eller biter?',
    options: {
      red: 'Bibimbap',
      blue: 'Sushi',
      green: 'Ceviche',
      yellow: 'Paella',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 16,
    question: 'Hva betyr ordet "hola" på spansk?',
    options: {
      red: 'Ha det',
      blue: 'Takk',
      green: 'Hei',
      yellow: 'Vær så snill',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
  {
    id: 17,
    question: 'Hva heter brødet som stekes i tandoor?',
    options: {
      red: 'Naan',
      blue: 'Pita',
      green: 'Lavash',
      yellow: 'Focaccia',
    },
    correctAnswer: 'red',
    timeLimit: 20,
  },
  {
    id: 18,
    question: 'Hva er hummus laget av?',
    options: {
      red: 'Linser',
      blue: 'Kikerter',
      green: 'Ris',
      yellow: 'Potet',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 19,
    question: 'Hva kalles det runde brødet med hull i midten?',
    options: {
      red: 'Bagel',
      blue: 'Donut',
      green: 'Pretzel',
      yellow: 'Ciabatta',
    },
    correctAnswer: 'red',
    timeLimit: 20,
  },
  {
    id: 20,
    question: 'Hva er mochi?',
    options: {
      red: 'Iskrem',
      blue: 'Ris-kake',
      green: 'Pannekake',
      yellow: 'Sjokoladebit',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
]
