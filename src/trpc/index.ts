import { TRPCError } from "@trpc/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import db from "@/db";
import { z } from "zod";

export const appRouter = router({
  authCallback: privateProcedure.query(async ({ ctx }) => {
    const { session } = ctx;

    console.log(JSON.stringify(session, null, 2));

    if (!session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    // check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        email: session.user?.email as string,
      },
    });

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          email: session.user?.email as string,
          name: session.user?.name as string,
          avatar: session.user?.image as string,
        },
      });
    }

    return { success: true, user: dbUser };
  }),
  getUser: privateProcedure.query(async ({ ctx }) => {
    const { session } = ctx;
    try {
      if (!session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const dbUser = await db.user.findFirst({
        where: {
          email: session.user?.email as string,
        },
      });
      return { user: dbUser };
    } catch (error) {
      console.log(error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  getLesson: publicProcedure.query(async ({ ctx }) => {
    const lessons = await db.lesson.findFirst();
    return { lesson: lessons };
  }),
  getLessonById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const lessonId = await db.lesson.findFirst({ where: { id: input.id } });
      
      const question = await db.question.findMany({
        where: { lessonId: input.id },
        include: { answers: true },
      });

      return { question: question };
    }),
});

export type AppRouter = typeof appRouter;
