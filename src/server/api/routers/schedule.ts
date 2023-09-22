import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const scheduleRouter = createTRPCRouter({
    getFilteredDays: publicProcedure.query(async ({ ctx }) => {
        // Fetch all schedule days from the database
        const scheduleDays = await ctx.prisma.schedule.findMany();

        // Filter out the days where both startTime and endTime are 0
        const filteredScheduleDays = scheduleDays.filter(
            (day) => day.startTime !== 0 || day.endTime !== 0
        );

        //  Validate and return the filtered schedule days
        return filteredScheduleDays;
    }),

    getAllDays: publicProcedure.query(async ({ ctx }) => {
        return ctx.prisma.schedule.findMany();
    }),

    // updateSchedule: protectedProcedure.input()

    // weirdly working but on refresh don't know why the update is invalid...
    updateMultipleSchedule: protectedProcedure
        .input(
            z.array(
                z.object({
                    dayOfWeek: z.number(),
                    startTime: z.number(),
                    endTime: z.number(),
                })
            )
        )
        .mutation(async ({ input, ctx }) => {
            const updatedSchedulesPromises = input.map(async (scheduleData) => {
                const { dayOfWeek, startTime, endTime } = scheduleData;

                // Update the existing schedule
                const updateSchedule = await ctx.prisma.schedule.update({
                    where: {
                        dayOfWeek: dayOfWeek,
                    },
                    data: {
                        startTime,
                        endTime,
                    },
                });

                return updateSchedule;
            });

            // Wait for all promises to resolve before returning
            const updatedSchedules = await Promise.all(
                updatedSchedulesPromises
            );

            return updatedSchedules;
        }),
});
