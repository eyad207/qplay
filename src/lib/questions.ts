export interface Question {
  id: number;
  question: string;
  options: {
    red: string;
    blue: string;
    green: string;
    yellow: string;
  };
  correctAnswer: "red" | "blue" | "green" | "yellow";
  timeLimit: number; // seconds
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Hva er hovedstaden i Canada?",
    options: {
      red: "Toronto",
      blue: "Vancouver",
      green: "Ottawa",
      yellow: "Montreal",
    },
    correctAnswer: "green",
    timeLimit: 20,
  },
  {
    id: 2,
    question: "Hvor mange kontinenter finnes det i verden?",
    options: {
      red: "5",
      blue: "6",
      green: "7",
      yellow: "8",
    },
    correctAnswer: "green",
    timeLimit: 20,
  },
  {
    id: 3,
    question: "Hvilket hav ligger mellom Europa og Amerika?",
    options: {
      red: "Stillehavet",
      blue: "Atlanterhavet",
      green: "Indiahavet",
      yellow: "Nordishavet",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },

  {
    id: 4,
    question: "Hvilket år startet andre verdenskrig?",
    options: {
      red: "1918",
      blue: "1939",
      green: "1945",
      yellow: "1950",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 5,
    question: "Hva er valutaen i Storbritannia?",
    options: {
      red: "Euro",
      blue: "Dollar",
      green: "Pund",
      yellow: "Kroner",
    },
    correctAnswer: "green",
    timeLimit: 20,
  },
  {
    id: 6,
    question: "Hvilket organ pumper blod i kroppen?",
    options: {
      red: "Lungene",
      blue: "Hjertet",
      green: "Leveren",
      yellow: "Nyrene",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },

  {
    id: 7,
    question: "Hvilket land har flest innbyggere i verden?",
    options: {
      red: "USA",
      blue: "India",
      green: "Kina",
      yellow: "Russland",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 8,
    question: "Hva er frysepunktet for vann i Celsius?",
    options: {
      red: "0",
      blue: "10",
      green: "32",
      yellow: "-10",
    },
    correctAnswer: "red",
    timeLimit: 20,
  },

  {
    id: 9,
    question: "Hvilket verdenshav er størst?",
    options: {
      red: "Atlanterhavet",
      blue: "Indiahavet",
      green: "Stillehavet",
      yellow: "Nordishavet",
    },
    correctAnswer: "green",
    timeLimit: 20,
  },
  {
    id: 10,
    question: "Hva heter Norges høyeste fjell?",
    options: {
      red: "Galdhøpiggen",
      blue: "Glittertind",
      green: "Gaustatoppen",
      yellow: "Snøhetta",
    },
    correctAnswer: "red",
    timeLimit: 20,
  },
  {
    id: 11,
    question: "Hvilken planet er kjent som den røde planeten?",
    options: {
      red: "Venus",
      blue: "Mars",
      green: "Jupiter",
      yellow: "Saturn",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 12,
    question: "Hva veier mest?",
    options: {
      red: "1 kg fjær",
      blue: "1 kg stein",
      green: "Begge veier like mye",
      yellow: "Avhenger av størrelsen",
    },
    correctAnswer: "green",
    timeLimit: 20,
  },
  {
    id: 13,
    question: "Hvilken måned har færrest dager?",
    options: {
      red: "Januar",
      blue: "Februar",
      green: "April",
      yellow: "November",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
];
