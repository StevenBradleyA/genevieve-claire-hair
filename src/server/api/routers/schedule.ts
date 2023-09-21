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
});
