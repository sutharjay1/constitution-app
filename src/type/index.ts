import { ELanguage } from "@/hooks/useLang";
import { z } from "zod";

const TUserSchema = z.object({
  id: z.number().or(z.string()),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().nullable(),
});

export type TUser = z.infer<typeof TUserSchema>;

export interface LangProps {
  lang: string;
  flag: string | JSX.Element;
  enum?: ELanguage;
}

export enum DailyGoalTime {
  FIVE_MIN_DAY = "5 min / day",
  TEN_MIN_DAY = "10 min / day",
  FIFTEEN_MIN_DAY = "15 min / day",
  TWENTY_MIN_DAY = "20 min / day",
}

export const DailyGoalTitles = {
  [DailyGoalTime.FIVE_MIN_DAY]: "Casual",
  [DailyGoalTime.TEN_MIN_DAY]: "Regular",
  [DailyGoalTime.FIFTEEN_MIN_DAY]: "Serious",
  [DailyGoalTime.TWENTY_MIN_DAY]: "Intense",
};

export enum EDailyGoalTitles {
  CASUAL = "Casual",
  REGULAR = "Regular",
  SERIOUS = "Serious",
  INTENSE = "Intense",
}

export interface DailyGoal {
  time: DailyGoalTime;
  title: EDailyGoalTitles;
}

export enum EState {
  LEARNING_REASON = "learningReason",
  PROFICIENCY = "proficiency",
  COURSEOVERVIEW = "courseOverview",
  DAILYGOAL = "dailyGoal",
  CHOOSEPATH = "choosePath",
}

export interface WelcomeState {
  state: EState;
  dailyGoal: DailyGoal[];
}

export enum EProficiency {
  BEGINNER = "Beginner",
  ELEMENTARY = "Elementary",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
  NATIVE = "Native",
}

export enum SideBarName {
  LEARN = "Learn",
  LEADERBOARD = "Leaderboards",
  QUESTS = "Quests",
  PROFILE = "Profile",
  MORE = "More",
}

export interface AnswerProp {
  text: string;
  isCorrect: boolean;
}

export interface QuestionProps {
  id: string;
  question: string;
  description: string;
  answers: AnswerProp[];
}

export enum Options {
  SOVEREIGN = "Sovereign",
  SOCIALIST = "Socialist",
  SECULAR = "Secular",
  DEMOCRATIC = "Democrtic",
  REPUBLIC = "Republic",
  JUSTICE = "Justice",
  LIBERTY = "Liberty",
  EQUALITY = "Equality",
  FRATERNITY = "Fraternity",
}
