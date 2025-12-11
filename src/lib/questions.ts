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
    question: 'Har et piano flest svarte eller hvite tangenter?',
    options: {
      red: 'Flest svarte',
      blue: 'Flest hvite',
      green: 'Likt antall',
      yellow: 'Ingen av delene',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 2,
    question:
      'Sant eller usant: Ingen håndballspillere har lov til å berøre ballen med foten.',
    options: {
      red: 'Sant',
      blue: 'Usant',
      green: '__',
      yellow: '__',
    },
    correctAnswer: 'red',
    timeLimit: 20,
  },
  {
    id: 3,
    question: 'Hvilken farge får du hvis du blander blått og rødt?',
    options: {
      red: 'Grønn',
      blue: 'Oransje',
      green: 'Lilla',
      yellow: 'Brun',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
  {
    id: 4,
    question:
      'Hvilken amerikansk stat er den eneste som starter med bokstaven «P»?',
    options: {
      red: 'Pennsylvania',
      blue: 'Portland',
      green: 'Phoenix',
      yellow: 'Providence',
    },
    correctAnswer: 'red',
    timeLimit: 20,
  },
  {
    id: 5,
    question: 'Hva er verdens største øy?',
    options: {
      red: 'Madagaskar',
      blue: 'Ny-Guinea',
      green: 'Grønland',
      yellow: 'Borneo',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
  {
    id: 6,
    question: 'Hvilket land har størst areal av Norge og Sverige?',
    options: {
      red: 'Norge',
      blue: 'Sverige',
      green: 'De er like store',
      yellow: 'Vet ikke',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 7,
    question: 'Hva er navnet på det største havet?',
    options: {
      red: 'Atlanterhavet',
      blue: 'Det indiske hav',
      green: 'Stillehavet',
      yellow: 'Nordishavet',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
  {
    id: 8,
    question: 'Hva heter hovedstaden i Spania?',
    options: {
      red: 'Barcelona',
      blue: 'Madrid',
      green: 'Sevilla',
      yellow: 'Valencia',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 9,
    question: 'Hva er Japans nasjonalsport?',
    options: {
      red: 'Karate',
      blue: 'Sumo',
      green: 'Judo',
      yellow: 'Kendo',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 10,
    question: 'Hvilket land har størst sjokoladekonsum per innbygger?',
    options: {
      red: 'Belgia',
      blue: 'Tyskland',
      green: 'Sveits',
      yellow: 'Frankrike',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
  {
    id: 11,
    question: 'Hvor mange år sitter den franske presidenten?',
    options: {
      red: '4 år',
      blue: '5 år',
      green: '6 år',
      yellow: '7 år',
    },
    correctAnswer: 'blue',
    timeLimit: 20,
  },
  {
    id: 12,
    question: 'Hvor mange norske konger har hatt navnet Harald?',
    options: {
      red: '2',
      blue: '3',
      green: '4',
      yellow: '5',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
  {
    id: 13,
    question: 'På et tastatur, hvilken bokstav er mellom Q og E?',
    options: {
      red: 'W',
      blue: 'A',
      green: 'R',
      yellow: 'T',
    },
    correctAnswer: 'red',
    timeLimit: 20,
  },
  {
    id: 14,
    question: 'Hvor mange tidssoner har Russland?',
    options: {
      red: '6',
      blue: '9',
      green: '11',
      yellow: '13',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
  {
    id: 15,
    question: 'Hvilket land har flest øyer i verden?',
    options: {
      red: 'Norge',
      blue: 'Indonesia',
      green: 'Filippinene',
      yellow: 'Sverige',
    },
    correctAnswer: 'yellow',
    timeLimit: 20,
  },
  {
    id: 16,
    question: 'Hva er hovedstaden i Canada?',
    options: {
      red: 'Toronto',
      blue: 'Vancouver',
      green: 'Ottawa',
      yellow: 'Montreal',
    },
    correctAnswer: 'green',
    timeLimit: 20,
  },
  {
    id: 17,
    question: 'Hva er den lengste elven i verden?',
    options: {
      red: 'Nilen',
      blue: 'Amazonas',
      green: 'Yangtze',
      yellow: 'Mississippi',
    },
    correctAnswer: 'red',
    timeLimit: 20,
  },
  {
    id: 18,
    question: 'Sted i Norge: 😂 + 🦶',
    options: {
      red: 'Lofoten',
      blue: 'Lillestrøm',
      green: 'Foten',
      yellow: 'Lom',
    },
    correctAnswer: 'red',
    timeLimit: 20,
  },
  {
    id: 19,
    question: '🧠 + 💡',
    options: {
      red: 'Idé',
      blue: 'Hjernelys',
      green: 'Brainstorm',
      yellow: 'Kreativ tanke',
    },
    correctAnswer: 'red',
    timeLimit: 20,
  },
]
