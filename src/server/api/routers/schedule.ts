import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

type ScheduleUpdateData = {
    dayOfWeek: number;
    startTime: number;
    endTime: number;
};

export const scheduleRouter = createTRPCRouter({
    getAllDays: publicProcedure.query(async ({ ctx }) => {
        // Fetch all schedule days from the database
        const scheduleDays = await ctx.prisma.schedule.findMany();

        // Filter out the days where both startTime and endTime are 0
        const filteredScheduleDays = scheduleDays.filter(
            (day) => day.startTime !== 0 || day.endTime !== 0
        );

        //  Validate and return the filtered schedule days
        return filteredScheduleDays;
    }),

    updateSchedule: protectedProcedure
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

                // Find the schedule to update based on the dayOfWeek
                const existingSchedule = await ctx.prisma.schedule.findUnique({
                    where: {
                        dayOfWeek: dayOfWeek, // Assuming dayOfWeek uniquely identifies a schedule
                    },
                });

                if (existingSchedule) {
                    // Update the existing schedule
                    const updatedSchedule = await ctx.prisma.schedule.update({
                        where: {
                            dayOfWeek: dayOfWeek,
                        },
                        data: {
                            startTime: startTime,
                            endTime: endTime,
                        },
                    });

                    return updatedSchedule;
                }

                return null; // Return null if no schedule was found for this input
            });

            const updatedSchedules = await Promise.all(
                updatedSchedulesPromises
            );

            return updatedSchedules.filter(Boolean); // Remove null values from the result array
        }),
});
