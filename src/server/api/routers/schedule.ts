import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export type DaysType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type ScheduleType = {
    [key in DaysType]: {
        startTime: number;
        endTime: number;
    };
};

export const scheduleRouter = createTRPCRouter({
    getNormalizedDays: publicProcedure.query(async ({ ctx }) => {
        const scheduleDays = await ctx.prisma.schedule.findMany();

        const scheduleObj: Partial<ScheduleType> = {};

        scheduleDays.forEach(({ dayOfWeek, startTime, endTime }) => {
            scheduleObj[dayOfWeek as DaysType] = {
                startTime,
                endTime,
            };
        });

        return scheduleObj as ScheduleType;
    }),

    getAllDays: publicProcedure.query(async ({ ctx }) => {
        return ctx.prisma.schedule.findMany();
    }),

    updateSchedule: protectedProcedure
        .input(
            z.object({
                id: z.number(),
                dayOfWeek: z.number(),
                startTime: z.number(),
                endTime: z.number(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const updatedSchedule = await ctx.prisma.schedule.update({
                where: {
                    id: input.id,
                },
                data: {
                    startTime: input.startTime,
                    endTime: input.endTime,
                },
            });
            return updatedSchedule;
        }),
});
