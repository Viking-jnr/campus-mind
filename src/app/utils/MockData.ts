import { auth } from "@/lib/firebase";

export const mockQuizData = {
  quizTitle: "Introduction to Software Engineering",
  mode: "QUIZ_MODE",
  questions: [
    {
      id: 1,
      question: "Which SDLC model is best suited for projects with shifting requirements and high uncertainty?",
      options: ["Waterfall", "V-Model", "Agile/Scrum", "Big Bang"],
      correctAnswer: "Agile/Scrum"
    },
    {
      id: 2,
      question: "In the context of the SOLID principles, what does the 'S' stand for?",
      options: [
        "System Integration", 
        "Single Responsibility", 
        "Software Stability", 
        "Sequential Logic"
      ],
      correctAnswer: "Single Responsibility"
    },
    {
      id: 3,
      question: "What is the primary purpose of a Data Flow Diagram (DFD)?",
      options: [
        "To model the logic of a specific function",
        "To represent the physical storage of data",
        "To show the flow of information through a system",
        "To define the database schema"
      ],
      correctAnswer: "To show the flow of information through a system"
    }
  ]
};

export const mockQuizMessage = {
  id: Date.now() + 1,
  role: "assistant",
  content: mockQuizData.quizTitle,
  mode: "quiz",
  quizData: mockQuizData.questions,
  marketPlaceData: null
};

export const mockNotesData = {
  content: `Here are some of the notes I found on the topic you mentioned. You can click the "Buy with HashPack" button to purchase access to these notes using your Hedera HashPack wallet. Once you buy them, they will be added to your library for easy access during your study sessions!`,
  notes: [
    {
      id: 1,
      title: "Lecture 1: Introduction to Software Engineering",
      author: "Professor Smith",
      priceHbar: 2.5,
      description: "These notes cover the basics of software engineering, including the software development lifecycle, key principles, and common methodologies. They provide a comprehensive overview for students new to the field."
    },
    {
      id: 2,
      title: "Lecture 2: Object-Oriented Design Principles",
      author: "Mary Johnson",
      priceHbar: 0.5,
      description: "These notes explore the core concepts of object-oriented design, including encapsulation, inheritance, and polymorphism. They provide practical examples and exercises to reinforce understanding."
    }
  ]
};

export const mockNotesMessage = {
  id: 23328,
  role: "assistant",
  content: `${mockNotesData.content}`,
  mode: "notes",
  quizData: null,
  marketPlaceData: mockNotesData.notes
}