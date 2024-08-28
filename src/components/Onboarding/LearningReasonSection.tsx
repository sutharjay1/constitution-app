import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Heading from "../Heading";
import { useOnboarding } from "@/hooks/useOnboarding";
import ClickableSection from "./ClickableSection";
import { motion } from "framer-motion";

export interface Reason {
  title: string;
  question: string;
  icon: React.ReactNode | (() => React.ReactNode);
}

const reasons: Reason[] = [
  {
    title: "Support my education",
    question: "What do I want to learn?",
    icon: () => (
      <Image src="/book.svg" alt="Education" width={32} height={32} />
    ),
  },
  {
    title: "Just for fun",
    question: "Like what I'm learning?",
    icon: () => <Image src="/confetti.svg" alt="Fun" width={32} height={32} />,
  },
  {
    title: "Boost my career",
    question: "What do I want to do?",
    icon: () => <Image src="/career.svg" alt="Career" width={32} height={32} />,
  },
  {
    title: "Connect with others",
    question: "Who do I connect with?",
    icon: () => (
      <Image src="/connect.svg" alt="Connect" width={32} height={32} />
    ),
  },
  {
    title: "Learn about India",
    question: "Where do I learn?",
    icon: () => <Image src="/india.svg" alt="India" width={32} height={32} />,
  },
];

const LearningReasonSection: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const { onboarding, setOnboarding } = useOnboarding();

  const handleClick = (reason: Reason) => {
    setSelectedReason(reason.title);

    setOnboarding({
      ...onboarding,
      whyLearn: reason.title.toUpperCase().replaceAll(" ", "_"),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <Heading className="text-2xl text-zinc-300 sm:text-3xl">
        Why are you learning Indian Constitution?
      </Heading>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        {reasons.map((reason) => (
          <ClickableSection
            handleClick={() => handleClick(reason)}
            selectedTitle={selectedReason!}
            target={reason}
            key={reason.title}
          >
            <div className="flex-shrink-0">
              {typeof reason.icon === "function" ? reason.icon() : reason.icon}
            </div>
            <span
              className={`text-base sm:text-lg ${
                selectedReason === reason.title
                  ? "text-[#60a5fa]"
                  : "text-zinc-300"
              }`}
            >
              {reason.title}
            </span>
          </ClickableSection>
        ))}
      </div>
    </motion.div>
  );
};

export default LearningReasonSection;
