"use client";

import GameButton from "@/components/Button/GameButton";
import Heading from "@/components/Heading";
import SparklesText from "@/components/magicui/sparkles-text";
import QuestionCard from "@/components/QuestionCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  DINRoundProBold,
  DINRoundProLight,
  DINRoundProMedi,
} from "@/config/font";
import { useHeart } from "@/hooks/useHeart";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { QuestionProps } from "@/type";
import { setCookie } from "cookies-next";
import { Check, Volume2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

interface LessonProps {
  params: {
    lessonId: string;
  };
}

const Lesson = ({ params }: LessonProps) => {
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const router = useRouter();
  const { heart, setHeart } = useHeart();

  const { lessonId } = params;

  const { data: lesson } = trpc.getLessonById.useQuery({
    id: lessonId as string,
  });

  console.log(JSON.stringify(lesson));

  const searchParams = useSearchParams();
  const questionParam = searchParams.get("q");

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const currentQuestion = lesson?.question[currentQuestionIndex];

  const handleSelectAnswer = (answer: string) => {
    if (!isAnswerChecked) {
      setSelectedAnswer(answer);
    }
  };

  useEffect(() => {
    if (questionParam) {
      const index = parseInt(questionParam);
      if (!isNaN(index) && index >= 0 && index < lesson?.question?.length!) {
        setCurrentQuestionIndex(index - 1);
        setProgress(((index + 1) / lesson?.question?.length!) * 100);
      }
    }
  }, [questionParam, setCurrentQuestionIndex, setProgress]);

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast(
        <Heading
          className={cn(
            "text-balance text-center text-sm font-bold text-red-600/80 sm:text-sm",
            DINRoundProMedi.className,
          )}
        >
          Please select an answer before continuing.
        </Heading>,
        {
          position: "top-center",
          cancel: true,
          cancelButtonStyle: {
            background: "red",
            color: "white",
          },
        },
      );

      return;
    }

    if (!isAnswerChecked) {
      const correctAnswer = currentQuestion?.answers.find(
        (answer) => answer.isCorrect,
      );
      const isCorrect = correctAnswer && correctAnswer.text === selectedAnswer;
      setIsAnswerCorrect(isCorrect as boolean);
      setIsAnswerChecked(true);
      setProgress(
        ((currentQuestionIndex + 1) / lesson?.question.length!) * 100,
      );

      if (!isCorrect) {
        setHeart(heart - 1);
      }
    } else {
      if (currentQuestionIndex < lesson?.question.length! - 1) {
        const nextIndex = currentQuestionIndex + 2;
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        router.push(`/lesson/${lessonId}?q=${nextIndex}`);
        setProgress((nextIndex / lesson?.question.length!) * 100);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        setIsAnswerChecked(false);
      } else {
        toast(
          <Heading
            className={cn(
              "text-balance text-center text-sm font-bold text-red-600/80 sm:text-sm",
              DINRoundProMedi.className,
            )}
          >
            You have completed all of the questions.
          </Heading>,
          {
            position: "top-center",
            cancel: true,
            cancelButtonStyle: {
              background: "red",
              color: "white",
            },
          },
        );

        //

        setCookie("lesson", "lesson_1");
      }
    }
  };

  console.log("currentQuestionIndex", currentQuestionIndex);

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < lesson?.question.length! - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      router.push(`/lesson/${lessonId}?q=${nextIndex}`);
      setProgress(((nextIndex + 1) / lesson?.question.length!) * 100);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
      setIsAnswerChecked(false);
    }
  };

  const [refillHeart, setRefillHeart] = useState(false);

  useEffect(() => {
    if (heart <= 0) {
      setRefillHeart(true);
    }
  }, [heart]);

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col overflow-y-scroll bg-background p-4 sm:p-6">
      <Dialog open={refillHeart} onOpenChange={setRefillHeart}>
        {/* Header */}
        <div className="mx-auto w-full max-w-6xl p-0 sm:p-4">
          <div className="mt-2 flex w-full items-center justify-center gap-3 sm:mt-10 sm:gap-6">
            <IoClose
              className="size-9 cursor-pointer text-zinc-200 transition-all duration-100 dark:text-zinc-300"
              onClick={() => router.push("/learn")}
            />
            <Progress value={progress} className="flex-grow" />
            <div className="relative flex w-fit items-center justify-center gap-3 rounded-2xl px-4 py-2 hover:bg-zinc-500/20">
              <Image src="/heart.svg" alt="Heart" width={28} height={28} />
              <Heading className="text-base text-rose-500 sm:text-base">
                {heart}
              </Heading>
            </div>
          </div>
        </div>

        {/* Question Section */}
        <div className="flex h-screen w-full flex-col items-center justify-start gap-4 overflow-y-scroll sm:h-fit sm:justify-center">
          <div className="-mt-8 flex flex-col items-start justify-start gap-2 overflow-y-auto sm:mt-8">
            <Heading
              className={cn(
                "mt-12 px-2 text-left text-2xl font-bold text-zinc-300/95 sm:px-6 sm:text-3xl",
                DINRoundProBold.className,
              )}
            >
              Read and respond
            </Heading>
            <div>
              {currentQuestion && (
                <QuestionCard
                  {...currentQuestion}
                  answers={currentQuestion.answers}
                  onAnswerSelect={handleSelectAnswer}
                  selectedAnswer={selectedAnswer}
                  isAnswerChecked={isAnswerChecked}
                  isAnswerCorrect={isAnswerCorrect}
                />
              )}
            </div>
          </div>
        </div>

        {refillHeart && (
          <DialogContent className="m-2 flex min-h-20 w-full flex-col items-center justify-center rounded-2xl bg-[#131f24] sm:rounded-2xl">
            <Image
              src="/buy-heart.svg"
              alt="India"
              width={150}
              height={150}
              className="mt-3"
            />
            <Heading
              className={cn(
                "py-4 text-center text-xl font-bold leading-normal tracking-wide text-zinc-300/95 sm:text-2xl sm:leading-7",
                DINRoundProBold.className,
              )}
            >
              You ran out of hearts. Have a free refill on us to keep going!
            </Heading>
            <GameButton
              onClick={() => {
                setHeart(5);
                setRefillHeart(false);
              }}
              divClassName="w-full flex items-center justify-center px-2"
              variant="blue"
              className="mb-3 flex w-full items-center justify-center py-3"
            >
              <Heading
                className={cn(
                  "text-balance text-center text-sm font-bold uppercase text-zinc-900 sm:text-base",
                  DINRoundProMedi.className,
                )}
              >
                Refill for free
              </Heading>
            </GameButton>
          </DialogContent>
        )}

        <div className="w-full">
          <div
            className={cn(
              "fixed bottom-0 left-0 right-0 border-t-[1.8px] border-zinc-500 p-4 py-6 sm:py-12",
              !isAnswerChecked && !isAnswerCorrect
                ? "bg-background"
                : "bg-[#202f36]",
            )}
          >
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-around space-y-3 sm:flex-row">
              {/* Display correct/incorrect message or skip button */}
              {!isAnswerChecked ? (
                <GameButton
                  onClick={handleSkipQuestion}
                  divClassName="w-full flex items-center justify-center"
                  variant="white"
                  className="flex w-full items-center justify-center py-3 sm:w-44"
                >
                  <Heading
                    className={cn(
                      "text-balance text-center text-sm font-bold uppercase text-zinc-900 sm:text-base",
                      DINRoundProMedi.className,
                    )}
                  >
                    Skip
                  </Heading>
                </GameButton>
              ) : isAnswerChecked && isAnswerCorrect ? (
                <div className="flex w-full items-center justify-center gap-4">
                  <div className="flex items-center justify-center rounded-full bg-[#131f24]">
                    <Check
                      className="size-16 cursor-pointer p-1.5 text-green-500/80 transition-all duration-100"
                      strokeWidth={4}
                    />
                  </div>
                  <div className="space-y-1">
                    <Heading
                      className={cn(
                        "text-balance text-left text-xl font-bold text-green-500/80 sm:text-2xl",
                        DINRoundProBold.className,
                      )}
                    >
                      Excellent!
                    </Heading>
                  </div>
                </div>
              ) : (
                <div className="flex w-full items-center justify-center gap-4">
                  <div className="flex items-center justify-center rounded-full bg-[#131f24]">
                    <IoClose
                      className="size-16 cursor-pointer p-1 text-red-500/80 transition-all duration-100 dark:text-zinc-300"
                      strokeWidth={32}
                    />
                  </div>
                  <div className="space-y-1">
                    <Heading
                      className={cn(
                        "text-balance text-left text-xl font-bold text-red-500/80 sm:text-2xl",
                        DINRoundProBold.className,
                      )}
                    >
                      Correct solution:
                    </Heading>
                    <Heading
                      className={cn(
                        "text-balance text-left text-sm font-bold text-red-500/70 sm:text-base",
                        DINRoundProMedi.className,
                      )}
                    >
                      for a plane to arrive
                    </Heading>
                  </div>
                </div>
              )}

              {/* Display Next or Continue button */}
              <GameButton
                onClick={handleNextQuestion}
                divClassName="w-full flex items-center justify-center"
                variant={
                  isAnswerChecked
                    ? isAnswerChecked && isAnswerCorrect
                      ? "blue"
                      : "red"
                    : "blue"
                }
                className="flex w-full items-center justify-center py-3 sm:w-44"
              >
                <Heading
                  className={cn(
                    "text-balance text-center text-sm font-bold uppercase text-zinc-900 sm:text-base",
                    DINRoundProMedi.className,
                  )}
                >
                  {isAnswerChecked ? "Next" : "Continue"}
                </Heading>
              </GameButton>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Lesson;
