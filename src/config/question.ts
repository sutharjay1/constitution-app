import { v4 as uuidv4 } from "uuid";
import { QuestionProps } from "@/type";

export const Questions: QuestionProps[] = [
  {
    id: uuidv4(),
    question: "Who is known as the Father of the Indian Constitution?",
    description: "Identify the key architect of the Indian Constitution.",
    answers: [
      {
        text: "Dr. B.R. Ambedkar",
        isCorrect: true,
      },
      {
        text: "Mahatma Gandhi",
        isCorrect: false,
      },
    ],
  },
  {
    id: uuidv4(),
    question:
      "Which part of the Indian Constitution deals with Fundamental Rights?",
    description:
      "Identify the part that guarantees basic rights to Indian citizens.",
    answers: [
      {
        text: "Part III",
        isCorrect: true,
      },
      {
        text: "Part IV",
        isCorrect: false,
      },
      {
        text: "Part II",
        isCorrect: false,
      },
    ],
  },
  {
    id: uuidv4(),
    question: "What does Article 21 of the Indian Constitution guarantee?",
    description: "Identify the fundamental right guaranteed by Article 21.",
    answers: [
      {
        text: "Right to Life and Personal Liberty",
        isCorrect: true,
      },
      {
        text: "Right to Equality",
        isCorrect: false,
      },
    ],
  },
  {
    id: uuidv4(),
    question: "How many schedules are there in the Indian Constitution?",
    description:
      "Identify the total number of schedules in the Indian Constitution.",
    answers: [
      {
        text: "12",
        isCorrect: true,
      },
      {
        text: "10",
        isCorrect: false,
      },
      {
        text: "11",
        isCorrect: false,
      },
      {
        text: "14",
        isCorrect: false,
      },
    ],
  },
  {
    id: uuidv4(),
    question:
      "Which Article of the Indian Constitution prohibits discrimination on grounds of religion, race, caste, sex, or place of birth?",
    description:
      "Identify the Article that ensures equality among all citizens.",
    answers: [
      {
        text: "Article 15",
        isCorrect: true,
      },
      {
        text: "Article 14",
        isCorrect: false,
      },
    ],
  },
  {
    id: uuidv4(),
    question: "Which amendment is known as the 'Mini Constitution'?",
    description:
      "Identify the amendment that significantly altered the Indian Constitution.",
    answers: [
      {
        text: "42nd Amendment",
        isCorrect: true,
      },
      {
        text: "44th Amendment",
        isCorrect: false,
      },
    ],
  },
  {
    id: uuidv4(),
    question:
      "Which Article of the Indian Constitution deals with the abolition of untouchability?",
    description: "Identify the Article that abolishes untouchability.",
    answers: [
      {
        text: "Article 17",
        isCorrect: true,
      },
      {
        text: "Article 19",
        isCorrect: false,
      },
      {
        text: "Article 18",
        isCorrect: false,
      },
    ],
  },
  {
    id: uuidv4(),
    question: "Who is the custodian of the Indian Constitution?",
    description:
      "Identify the authority responsible for the protection of the Indian Constitution.",
    answers: [
      {
        text: "The Supreme Court of India",
        isCorrect: true,
      },
      {
        text: "The President of India",
        isCorrect: false,
      },
    ],
  },
  {
    id: uuidv4(),
    question:
      "Which part of the Indian Constitution deals with Directive Principles of State Policy?",
    description:
      "Identify the part that outlines the principles for governance.",
    answers: [
      {
        text: "Part IV",
        isCorrect: true,
      },
      {
        text: "Part III",
        isCorrect: false,
      },
      {
        text: "Part V",
        isCorrect: false,
      },
    ],
  },
  {
    id: uuidv4(),
    question: "In which year was the Indian Constitution adopted?",
    description:
      "Identify the year when the Indian Constitution was officially adopted.",
    answers: [
      {
        text: "1949",
        isCorrect: true,
      },
      {
        text: "1950",
        isCorrect: false,
      },
      {
        text: "1947",
        isCorrect: false,
      },
    ],
  },
  {
    id: uuidv4(),
    question: "What does Article 32 of the Indian Constitution provide?",
    description:
      "Identify the Article that allows citizens to move to the Supreme Court for enforcement of Fundamental Rights.",
    answers: [
      {
        text: "Right to Constitutional Remedies",
        isCorrect: true,
      },
      {
        text: "Right to Freedom",
        isCorrect: false,
      },
    ],
  },
  {
    id: uuidv4(),
    question:
      "Which part of the Indian Constitution is called the 'Magna Carta'?",
    description:
      "Identify the part of the Constitution that is compared to the Magna Carta.",
    answers: [
      {
        text: "Part III (Fundamental Rights)",
        isCorrect: true,
      },
      {
        text: "Part IV (Directive Principles of State Policy)",
        isCorrect: false,
      },
    ],
  },
  {
    id: uuidv4(),
    question:
      "Which Article of the Indian Constitution provides for the formation of a Finance Commission?",
    description: "Identify the Article that deals with the Finance Commission.",
    answers: [
      {
        text: "Article 280",
        isCorrect: true,
      },
      {
        text: "Article 324",
        isCorrect: false,
      },
    ],
  },
  {
    id: uuidv4(),
    question:
      "Which Article of the Indian Constitution provides for the right to education?",
    description:
      "Identify the Article that makes education a fundamental right.",
    answers: [
      {
        text: "Article 21A",
        isCorrect: true,
      },
      {
        text: "Article 45",
        isCorrect: false,
      },
      {
        text: "Article 19",
        isCorrect: false,
      },
    ],
  },
  {
    id: uuidv4(),
    question:
      "Which part of the Indian Constitution is related to the Union and its territory?",
    description: "Identify the part that defines the union and its territory.",
    answers: [
      {
        text: "Part I",
        isCorrect: true,
      },
      {
        text: "Part II",
        isCorrect: false,
      },
      {
        text: "Part III",
        isCorrect: false,
      },
    ],
  },
];
