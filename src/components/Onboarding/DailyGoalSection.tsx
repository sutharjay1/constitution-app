import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DailyGoalTime, DailyGoalTitles, EDailyGoalTitles } from "@/type";
import { useOnboarding } from "@/hooks/useOnboarding";
import ClickableSection from "./ClickableSection";
import { motion } from "framer-motion";

const dailyGoals = [
  { time: DailyGoalTime.FIVE_MIN_DAY, title: [DailyGoalTime.FIVE_MIN_DAY] },
  { time: DailyGoalTime.TEN_MIN_DAY, title: [DailyGoalTime.TEN_MIN_DAY] },
  {
    time: DailyGoalTime.FIFTEEN_MIN_DAY,
    title: [DailyGoalTime.FIFTEEN_MIN_DAY],
  },
  { time: DailyGoalTime.TWENTY_MIN_DAY, title: [DailyGoalTime.TWENTY_MIN_DAY] },
];

export interface DailyGoalSectionProps {
  time: DailyGoalTime;
  title: string[];
}

const DailyGoalSection: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<DailyGoalTime | null>(null);

  const { onboarding, setOnboarding } = useOnboarding();

  const handleClick = (goal: DailyGoalSectionProps) => {
    setSelectedGoal(goal.time);

    setOnboarding({
      ...onboarding,
      dailyGoal: {
        time: goal.time,
        title: DailyGoalTitles[goal.time],
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-md"
    >
      <h2 className="mb-6 text-xl text-zinc-300">Set your daily goal</h2>
      <div className="flex flex-col gap-4">
        {dailyGoals.map((goal) => (
          <ClickableSection
            handleClick={() => handleClick(goal)}
            selectedTitle={selectedGoal!}
            target={goal}
            key={goal.title[0]}
          >
            <span
              className={`text-base sm:text-lg ${
                selectedGoal === goal.time ? "text-[#60a5fa]" : "text-zinc-300"
              }`}
            >
              {goal.time}
            </span>
            <span
              className={`text-base sm:text-lg ${
                selectedGoal === goal.time ? "text-[#60a5fa]" : "text-zinc-300"
              }`}
            >
              {DailyGoalTitles[goal.time]}
            </span>
          </ClickableSection>
        ))}
      </div>
    </motion.div>
  );
};

export default DailyGoalSection;
