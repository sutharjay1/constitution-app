import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const main = async () => {
  try {
    // const seedData = fs.readFileSync("./seed.json", "utf8");
    // const seedData = fs.readFileSync("./medium.json", "utf8");
    const seedData = fs.readFileSync("./hard.json", "utf8");
    const seedDataJson = JSON.parse(seedData);

    for (const data of seedDataJson) {
      // Create Lesson first
      const createdLesson = await db.lesson.create({
        data: {
          id: data.lesson.id, // Set the lesson ID
          nextLesson: data.lesson.nextLesson,
        },
      });
      console.log("Seeding successful for lesson:", createdLesson);

      // Create Questions associated with the created Lesson
      for (const questionData of data.questions) {
        const { answers, ...question } = questionData;

        const createdQuestion = await db.question.create({
          data: {
            ...question,
            lessonId: createdLesson.id, // Associate the question with the created lesson
            answers: {
              create: answers.map((answer) => ({
                text: answer.text,
                isCorrect: answer.isCorrect,
              })), // Create answers associated with the question
            },
          },
        });
        console.log("Seeding successful for question:", createdQuestion);
      }
    }
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await db.$disconnect();
  }
};

main().catch((e) => {
  console.error(e);
  db.$disconnect();
  process.exit(1);
});
