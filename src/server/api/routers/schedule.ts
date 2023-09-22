import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

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

                console.log(
                    "\n\n\n\n NEWWWW DATA \n\n\n",
                    dayOfWeek,
                    startTime,
                    endTime
                );

                // Find the schedule to update based on the dayOfWeek
                const existingSchedule = await ctx.prisma.schedule.findUnique({
                    where: {
                        dayOfWeek: dayOfWeek,
                    },
                });
                console.log("\n\n\n\n HELLLLOOOOO \n\n\n", existingSchedule);

                if (existingSchedule) {
                    // Update the existing schedule
                    const updateSchedule = await ctx.prisma.schedule.update({
                        where: {
                            id: existingSchedule.id,
                        },
                        data: {
                            startTime,
                            endTime,
                        },
                    });

                    return updateSchedule;
                }

                return null;
            });

            const updatedSchedules = await Promise.all(
                updatedSchedulesPromises
            );

            return updatedSchedules;
        }),
});
