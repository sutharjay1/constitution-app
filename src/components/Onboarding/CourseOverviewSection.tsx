import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const courseOverview = [
  {
    title: "Beginner",
    description: "Start with the basics and build a strong foundation.",
    icon: () => (
      <Image src="/connect.svg" alt="Beginner" width={48} height={48} />
    ),
  },
  {
    title: "Intermediate",
    description: "Expand your vocabulary and improve your grammar.",
    icon: () => (
      <Image src="/confetti.svg" alt="Intermediate" width={48} height={48} />
    ),
  },
  {
    title: "Advanced",
    description: "Master complex topics and fine-tune your skills.",
    icon: () => (
      <Image src="/career.svg" alt="Advanced" width={48} height={48} />
    ),
  },
];

const CourseOverviewSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-3xl"
    >
      {/* <h2 className="mb-6 text-xl text-zinc-300">Course Overview</h2> */}
      <div className="grid w-full grid-rows-4 place-items-center gap-4">
        {courseOverview.map((course, index) => (
          <Card key={index} className="border-0 bg-transparent shadow-none">
            <CardContent className="flex w-full items-center justify-center p-6">
              <div className="mr-4 flex-shrink-0">
                {typeof course.icon === "function"
                  ? course.icon()
                  : course.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-zinc-200 sm:text-xl">
                  {course.title}
                </h3>
                <p className="text-base text-zinc-300 sm:text-lg">
                  {course.description}
                </p>
              </div>{" "}
            </CardContent>
            {index !== courseOverview.length - 1 && (
              <Separator className="h-[0.1rem] rounded-full bg-zinc-600/65" />
            )}
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default CourseOverviewSection;
