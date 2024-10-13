import { QuestionProps } from "@/type";
import { useEffect, useState } from "react";
import Heading from "./Heading";
import { cn } from "@/lib/utils";
import { DINRoundProLight, DINRoundProMedi } from "@/config/font";
import GameButton from "./Button/GameButton";
import { Volume2 } from "lucide-react";
import SparklesText from "./magicui/sparkles-text";

interface QuestionCardProps extends QuestionProps {
  onAnswerSelect: (answer: string) => void;
  selectedAnswer: string | null;
  isAnswerChecked: boolean;
  isAnswerCorrect: boolean | null;
  answers: {
    id: string;
    text: string;
    isCorrect: boolean;
    questionId: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  description,
  answers,
  onAnswerSelect,
  selectedAnswer,
  isAnswerChecked,
  isAnswerCorrect,
}: any) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [femaleVoice, setFemaleVoice] = useState(true);

  useEffect(() => {
    // Load voices when they are available
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    loadVoices(); // Initial load

    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleSelectAnswer = (answerText: string) => {
    if (!isAnswerChecked) {
      onAnswerSelect(answerText);
    }
  };

  const speak = () => {
    const speech = new SpeechSynthesisUtterance(question);
    speech.lang = "en-US";
    speech.rate = 0.9; // Slightly slower for clarity
    speech.pitch = 0.9; // Neutral pitch

    // Select voice based on gender
    const selectedVoice = voices.find((voice) =>
      femaleVoice
        ? voice.name.toLowerCase().includes("female")
        : voice.name.toLowerCase().includes("male"),
    );

    if (selectedVoice) {
      speech.voice = selectedVoice;
    }

    window.speechSynthesis.speak(speech);
  };

  const toggleVoice = () => {
    setFemaleVoice(!femaleVoice);
  };

  return (
    <div className="mx-auto h-screen w-full max-w-2xl overflow-y-scroll rounded-lg p-2 sm:p-6">
      <div className="mb-4">
        <Heading
          className={cn(
            "relative flex w-full flex-grow items-start justify-start gap-2 text-left text-2xl font-extrabold text-zinc-100 sm:text-xl",
            DINRoundProMedi.className,
          )}
        >
          <GameButton
            divClassName=" w-fit flex items-center justify-center"
            variant="blue"
            onClick={speak}
            className="flex items-center justify-center px-2.5 py-2 shadow-[0_4px_0_#3B82F650]"
          >
            <Volume2 className="text-zinc-800" />
          </GameButton>
          <span className="indent-[4rem] sm:indent-[4rem]"></span>
          {question}
        </Heading>
        <Heading
          className={cn(
            "mt-4 flex items-start justify-start text-left text-xl font-extrabold text-zinc-100 sm:text-xl",
            DINRoundProLight.className,
          )}
        >
          {description}
        </Heading>
      </div>

      <div className="mt-8 space-y-4">
        {answers.map((answerItem: any) =>
          // <button
          //   key={answerItem.text}
          //   onClick={() => handleSelectAnswer(answerItem.text)}
          //   disabled={isAnswerChecked}
          //   className={`flex w-full translate-y-[2px] cursor-pointer items-center gap-5 rounded-xl border-2 border-b-[4.5px] border-gray-500/60 bg-transparent p-4 px-6 text-center text-base font-medium transition-all duration-200 ease-in-out active:translate-y-[6px] active:shadow-none ${
          //     selectedAnswer === answerItem.text
          //       ? isAnswerChecked
          //         ? answerItem.isCorrect
          //           ? "border-green-500 bg-green-100 text-green-500 shadow-[0_4px_0_#6EE7B7]"
          //           : "border-red-500 bg-red-100 text-red-500 shadow-[0_4px_0_#F87171]"
          //         : "border-mediumBlue bg-mediumBlue/10 text-mediumBlue shadow-[0_4px_0_#3B82F6A6]"
          //       : "text-zinc-200 shadow-[0_4px_0_#4f535c] hover:bg-[#4f535c]"
          //   } ${isAnswerChecked ? "cursor-not-allowed opacity-50" : ""}`}
          // >
          //   {answerItem.text}
          // </button>

          selectedAnswer === answerItem.text &&
          answerItem.isCorrect &&
          isAnswerChecked &&
          isAnswerCorrect ? (
            <SparklesText sparklesCount={6} key={answerItem.text}>
              <button
                key={answerItem.text}
                onClick={() => handleSelectAnswer(answerItem.text)}
                disabled={isAnswerChecked}
                className={`flex w-full translate-y-[2px] cursor-pointer items-center gap-5 rounded-xl border-2 border-b-[4.5px] border-gray-500/60 bg-transparent p-4 px-6 text-center text-base font-medium transition-all duration-200 ease-in-out active:translate-y-[6px] active:shadow-none ${
                  selectedAnswer === answerItem.text
                    ? isAnswerChecked
                      ? answerItem.isCorrect &&
                        "border-green-500 bg-green-100 text-green-500 shadow-[0_2px_0_#6EE7B7]"
                      : "border-[#a79980] bg-[#a79980]/10 text-[#a79980] shadow-[0_2px_0_#3B82F6A6]"
                    : "text-zinc-200 shadow-[0_2px_0_#a79980] hover:bg-[#4f535c]"
                } ${isAnswerChecked ? "cursor-not-allowed opacity-50" : ""}`}
              >
                {answerItem.text}
              </button>
            </SparklesText>
          ) : (
            <button
              key={answerItem.text}
              onClick={() => handleSelectAnswer(answerItem.text)}
              disabled={isAnswerChecked}
              className={`flex w-full translate-y-[2px] cursor-pointer items-center gap-5 rounded-xl border-2 border-b-[4.5px] border-gray-500/60 bg-transparent p-4 px-6 text-center text-base font-medium transition-all duration-200 ease-in-out active:translate-y-[6px] active:shadow-none ${
                selectedAnswer === answerItem.text
                  ? isAnswerChecked
                    ? !answerItem.isCorrect &&
                      "border-red-500 bg-red-100 text-red-500 shadow-[0_2px_0_#F87171]"
                    : "border-mediumBlue bg-mediumBlue/10 text-mediumBlue shadow-[0_2px_0_#3B82F6A6]"
                  : "text-zinc-200 shadow-[0_2px_0_#4f535c] hover:bg-[#4f535c]"
              } ${isAnswerChecked ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {answerItem.text}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
