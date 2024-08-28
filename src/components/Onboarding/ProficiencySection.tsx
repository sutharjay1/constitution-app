import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useOnboarding } from "@/hooks/useOnboarding";
import { EProficiency } from "@/type";
import ClickableSection from "./ClickableSection";
import { motion } from "framer-motion";
// const proficiencyLevels = [
//   "Beginner",
//   "Elementary",
//   "Intermediate",
//   "Advanced",
//   "Native",
// ];

export interface ProficiencySectionProps {
  title: EProficiency;
  question: string;
  icon: React.ReactNode | (() => React.ReactNode);
}

const proficiencyLevels: ProficiencySectionProps[] = [
  {
    title: EProficiency.BEGINNER,
    question: "What do I want to learn?",
    icon: () => (
      <Image
        src="/net0.svg"
        alt="Education"
        width={32}
        height={32}
        className="text-blue-600"
      />
    ),
  },
  {
    title: EProficiency.ELEMENTARY,
    question: "Like what I'm learning?",
    icon: () => <Image src="/net1.svg" alt="Fun" width={32} height={32} />,
  },
  {
    title: EProficiency.INTERMEDIATE,
    question: "What do I want to do?",
    icon: () => <Image src="/net2.svg" alt="Career" width={32} height={32} />,
  },
  {
    title: EProficiency.ADVANCED,
    question: "Who do I connect with?",
    icon: () => (
      <Image
        src="/net3.svg"
        alt="Connect"
        width={32}
        height={32}
        className="text-blue-600"
      />
    ),
  },
  {
    title: EProficiency.NATIVE,
    question: "Where do I learn?",
    icon: () => <Image src="/net4.svg" alt="India" width={32} height={32} />,
  },
];

const ProficiencySection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const { onboarding, setOnboarding } = useOnboarding();

  const handleClick = (level: ProficiencySectionProps) => {
    setSelectedLevel(level.title);

    setOnboarding({
      ...onboarding,
      proficiency: level.title,
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
      <h2 className="mb-6 text-xl text-zinc-300">
        What&#39;s your current proficiency level?
      </h2>
      <div className="flex flex-col gap-4">
        {proficiencyLevels.map((level) => (
          <ClickableSection
            handleClick={() => handleClick(level)}
            selectedTitle={selectedLevel!}
            target={level}
            key={level.title}
          >
            <div className="flex-shrink-0">
              {typeof level.icon === "function" ? level.icon() : level.icon}
            </div>
            <span
              className={`text-base sm:text-lg ${
                selectedLevel === level.title
                  ? "text-[#60a5fa]"
                  : "text-zinc-300"
              }`}
            >
              {level.title}
            </span>
          </ClickableSection>
        ))}
      </div>
    </motion.div>
  );
};

export default ProficiencySection;
