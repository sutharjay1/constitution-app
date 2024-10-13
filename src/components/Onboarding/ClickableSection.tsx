import React from "react";
import DailyGoalSection, { DailyGoalSectionProps } from "./DailyGoalSection";
import { Reason } from "./LearningReasonSection";
import { ProficiencySectionProps } from "./ProficiencySection";
import { DailyGoalTime } from "@/type";

interface ClickableSectionProps {
  target:
    | Reason
    | DailyGoalSectionProps
    | ProficiencySectionProps
    | DailyGoalTime;
  selectedTitle: string;
  handleClick: () => void;
  children: React.ReactNode;
  className?: string;
  key: string;
}

const ClickableSection = ({
  target,
  selectedTitle,
  handleClick,
  children,
  className,
  key,
  ...props
}: ClickableSectionProps) => {
  // const isSelected =
  //   typeof target === "string"
  //     ? selectedTitle === (target as any).title
  //     : selectedTitle === (target as any).time;

  return (
    <button
      key={key}
      //@ts-ignore
      onClick={() => handleClick(target)}
      className={`flex w-full translate-y-[2px] cursor-pointer items-center gap-5 rounded-xl border-2 border-b-[4.5px] border-gray-500/60 bg-transparent p-4 px-6 text-sm font-medium transition-all duration-200 ease-in-out active:translate-y-[6px] active:shadow-none ${
        selectedTitle === ((target as any).time || (target as any).title)
          ? "border-mediumBlue bg-mediumBlue/20 shadow-[0_4px_0_#3B82F6A6]"
          : "shadow-[0_4px_0_#4f535c] hover:bg-[#4f535c]"
      }`}
      // className={`flex w-full items-center gap-5 rounded-xl border-2 border-b-[4.5px] border-gray-500/60  p-4 text-sm font-medium transition-colors focus:outline-none ${
      //   selectedReason === reason.title
      //     ? "border-blue-500/65 bg-blue-500/15"
      //     : "hover:bg-zinc-500/20"
      // }`}
    >
      {children}
    </button>
  );
};

export default ClickableSection;
