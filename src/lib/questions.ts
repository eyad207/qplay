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
    question: "What does the title Born a Crime mean?",
    options: {
      red: "Trevor committed a crime",
      blue: "Trevor's parents' relationship was illegal",
      green: "Trevor was born in prison",
      yellow: "Trevor's mother was a criminal",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 2,
    question: "What was apartheid?",
    options: {
      red: "A language spoken in Africa",
      blue: "A system of racial segregation",
      green: "A type of government election",
      yellow: "A South African tradition",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 3,
    question: "Why couldn't Trevor's parents walk freely together in public?",
    options: {
      red: "They lived in different cities",
      blue: "They spoke different languages",
      green: "Their interracial relationship was illegal",
      yellow: "They did not know each other",
    },
    correctAnswer: "green",
    timeLimit: 20,
  },
  {
    id: 4,
    question: "Why did Trevor sometimes struggle to belong to a group?",
    options: {
      red: "He did not like people",
      blue: "He was mixed-race in a racially divided society",
      green: "He did not speak English",
      yellow: "He did not want friends",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 5,
    question: "How did speaking different languages help Trevor?",
    options: {
      red: "It helped him connect with different groups",
      blue: "It made him famous immediately",
      green: "It allowed him to avoid school",
      yellow: "It changed his skin colour",
    },
    correctAnswer: "red",
    timeLimit: 20,
  },
  {
    id: 6,
    question: "What does Trevor mean when he describes himself as a chameleon?",
    options: {
      red: "He could physically change colour",
      blue: "He enjoyed studying animals",
      green: "He adapted by speaking different languages",
      yellow: "He always hid from everyone",
    },
    correctAnswer: "green",
    timeLimit: 20,
  },
  {
    id: 7,
    question: "Why did Trevor's grandmother treat him differently from his cousins?",
    options: {
      red: "He was older than his cousins",
      blue: "She was afraid to punish him because of his lighter skin",
      green: "He was always well-behaved",
      yellow: "He was her youngest grandchild",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 8,
    question: "What does Trevor's story teach us about stereotypes?",
    options: {
      red: "We can always judge people by their appearance",
      blue: "Everyone from the same country is alike",
      green: "Skin colour determines someone's personality",
      yellow: "We should not judge people based on their appearance",
    },
    correctAnswer: "yellow",
    timeLimit: 20,
  },
  {
    id: 9,
    question: "Who played a major role in ending apartheid in South Africa?",
    options: {
      red: "Trevor Noah",
      blue: "Nelson Mandela",
      green: "Barack Obama",
      yellow: "Martin Luther King Jr.",
    },
    correctAnswer: "blue",
    timeLimit: 20,
  },
  {
    id: 10,
    question: "What is an important message of Born a Crime?",
    options: {
      red: "People should be judged by appearance",
      blue: "Language always divides people",
      green: "Everyone must have the same culture",
      yellow: "Identity is more than skin colour",
    },
    correctAnswer: "yellow",
    timeLimit: 20,
  },
];
