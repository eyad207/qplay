export interface Question {
  id: number;
  question: string;
  image?: string;
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
    question:
      "Which are the two most spoken languages in the world, according to the text?",
    options: {
      red: "English and Spanish",
      blue: "Mandarin Chinese and Spanish",
      green: "Mandarin Chinese and English",
      yellow: "Spanish and Arabic",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 2,
    question: "What did the British use Australia for at first?",
    options: {
      red: "A holiday destination",
      blue: "A trading centre",
      green: "A penal colony for convicts",
      yellow: "A place to build universities",
    },
    correctAnswer: "green",
    timeLimit: 20,
  },
  {
    id: 3,
    question: "When did the US overtake Britain in industrial production?",
    options: {
      red: "In the 16th century",
      blue: "In the 17th century",
      green: "By the end of the 19th century",
      yellow: "After 2000",
    },
    correctAnswer: "green",
    timeLimit: 20,
  },
  {
    id: 4,
    question: "Which colony was established by English settlers in 1607?",
    options: {
      red: "New York",
      blue: "Jamestown",
      green: "London",
      yellow: "India",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 5,
    question:
      "Where did Rockefeller, Vanderbilt and Carnegie get their wealth?",
    options: {
      red: "Oil, railways and steel",
      blue: "Farming, fishing and tourism",
      green: "Music, films and radio",
      yellow: "Schools, books and newspapers",
    },
    correctAnswer: "red",
    timeLimit: 20,
  },
  {
    id: 6,
    question:
      "According to the author, why is Mandarin Chinese unlikely to replace English as the world language?",
    options: {
      red: "Nobody speaks Mandarin Chinese",
      blue: "China has no international business",
      green: "Chinese is only spoken in schools",
      yellow:
        "English is already established worldwide, and the author considers Chinese difficult to learn",
    },
    correctAnswer: "yellow",
    timeLimit: 30,
  },
  {
    id: 7,
    question:
      "Which country later became a major economic superpower and strengthened the global influence of English?",
    options: {
      red: "Norway",
      blue: "India",
      green: "Spain",
      yellow: "The USA",
    },
    correctAnswer: "yellow",
    timeLimit: 20,
  },
  {
    id: 8,
    question:
      "Which statement best summarizes why English became a global language?",
    options: {
      red: "Only British people speak English",
      blue: "English became global because of one event",
      green: "English is the world's oldest language",
      yellow: "History, economic power and culture all helped spread English",
    },
    correctAnswer: "yellow",
    timeLimit: 20,
  },
];
