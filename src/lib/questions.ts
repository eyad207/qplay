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
    question:
      "Why is it difficult to change the gun laws in the United States?",
    options: {
      red: "Everyone agrees",
      blue: "Political and cultural disagreements",
      green: "No laws exist",
      yellow: "Guns are illegal",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 2,
    question:
      "The right to own guns in the USA is connected to which document?",
    options: {
      red: "School laws",
      blue: "United States Constitution",
      green: "UN school rules",
      yellow: "Local school policies",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 3,
    question: "Which organization often supports gun rights in the USA?",
    options: {
      red: "National Rifle Association",
      blue: "World Health Organization",
      green: "United Nations",
      yellow: "Red Cross",
    },
    correctAnswer: "red",
    timeLimit: 20,
  },
  {
    id: 4,
    question: "The movement March for Our Lives mainly focuses on:",
    options: {
      red: "Student fashion",
      blue: "Gun control and safety activism",
      green: "Sports events",
      yellow: "School rules",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 5,
    question: "Why did gun laws become stricter in New Zealand after 2019?",
    options: {
      red: "After a tragic terrorist attack",
      blue: "After elections",
      green: "After economic problems",
      yellow: "After school exams",
    },
    correctAnswer: "red",
    timeLimit: 20,
  },
  {
    id: 6,
    question: "Which is a common argument against stricter gun laws?",
    options: {
      red: "It protects freedom and self-defense rights",
      blue: "It increases safety for everyone",
      green: "It stops crime completely",
      yellow: "It removes political debate",
    },
    correctAnswer: "red",
    timeLimit: 20,
  },
  {
    id: 7,
    question: "Which factor influences laws in different countries?",
    options: {
      red: "History and culture",
      blue: "Only weather",
      green: "Only school rules",
      yellow: "Only sports culture",
    },
    correctAnswer: "red",
    timeLimit: 20,
  },
  {
    id: 8,
    question: "What is one goal of student activism?",
    options: {
      red: "To influence society and political decisions",
      blue: "To stop education",
      green: "To avoid laws",
      yellow: "To close communities",
    },
    correctAnswer: "red",
    timeLimit: 20,
  },
  {
    id: 9,
    question: "Why do some people believe guns are part of American culture?",
    options: {
      red: "Historical frontier life and freedom ideas",
      blue: "Because of social media",
      green: "Because of schools",
      yellow: "Because of sports only",
    },
    correctAnswer: "red",
    timeLimit: 20,
  },
  {
    id: 10,
    question: "Which statement shows critical thinking about gun laws?",
    options: {
      red: "All countries should have the same laws",
      blue: "Laws depend on culture, history, and society",
      green: "Laws are never changed",
      yellow: "Only young people decide laws",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
];
