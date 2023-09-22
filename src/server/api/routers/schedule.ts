import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const scheduleRouter = createTRPCRouter({
    getFilteredDays: publicProcedure.query(async ({ ctx }) => {
        const scheduleDays = await ctx.prisma.schedule.findMany();

        const filteredScheduleDays = scheduleDays.filter(
            (day) => day.startTime !== 0 || day.endTime !== 0
        );

        return filteredScheduleDays;
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
