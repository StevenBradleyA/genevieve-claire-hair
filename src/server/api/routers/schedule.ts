import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { eachDayOfInterval, add } from "date-fns";

export type DaysType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type ScheduleType = {
    [key in DaysType]: {
        startTime: number;
        endTime: number;
    };
};

const formatTime = (time: string) => {
    const [h, m] = time.split(":");

    return { hours: Number(h), minutes: Number(m) };
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
        return await ctx.prisma.schedule.findMany();
    }),

    getTimeOff: publicProcedure.query(async ({ ctx }) => {
        const allTimeOff = await ctx.prisma.timeOff.findMany();

        const full: typeof allTimeOff = [];
        const partial: typeof allTimeOff = [];

        for (const el of allTimeOff) {
            if (el.startDate.getHours() === el.endDate.getHours())
                full.push(el);
            else partial.push(el);
        }
        return { full, partial };
    }),

    createFullTimeOff: protectedProcedure
        .input(
            z.object({
                startDate: z.date(),
                endDate: z.date().optional(),
            })
        )
        .mutation(async ({ input: { startDate, endDate }, ctx }) => {
            return await ctx.prisma.timeOff.create({
                data: {
                    startDate,
                    endDate: endDate || startDate,
                },
            });
        }),

    createPartialTimeOff: protectedProcedure
        .input(
            z.object({
                startDate: z.date(),
                endDate: z.date().optional(),
                startTime: z.string(),
                endTime: z.string(),
            })
        )
        .mutation(
            async ({
                input: { startDate, endDate, startTime, endTime },
                ctx,
            }) => {
                if (!endDate) {
                    return await ctx.prisma.timeOff.create({
                        data: {
                            startDate: add(startDate, formatTime(startTime)),
                            endDate: add(startDate, formatTime(endTime)),
                        },
                    });
                }

                const days = eachDayOfInterval({
                    start: startDate,
                    end: endDate,
                });

                for (const day of days) {
                    await ctx.prisma.timeOff.create({
                        data: {
                            startDate: add(day, formatTime(startTime)),
                            endDate: add(day, formatTime(endTime)),
                        },
                    });
                }

                return "Success";
            }
        ),

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

    deleteTimeOff: protectedProcedure
        .input(z.number())
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.timeOff.delete({
                where: {
                    id: input,
                },
            });

            return "Successfully deleted";
        }),
});
