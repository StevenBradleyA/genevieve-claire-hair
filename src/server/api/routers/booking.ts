import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const bookingRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.booking.findMany();
    }),

    getPast: publicProcedure.query(async ({ ctx }) => {
        const bookedArr = await ctx.prisma.booking.findMany({
            where: {
                startDate: {
                    lt: new Date(),
                },
            },
            orderBy: {
                startDate: "desc",
            },
        });

        return bookedArr;
    }),

    getFuture: publicProcedure.query(async ({ ctx }) => {
        const bookedArr = await ctx.prisma.booking.findMany({
            where: {
                startDate: {
                    gte: new Date(),
                },
            },
            orderBy: {
                startDate: "asc",
            },
        });

        return bookedArr;
    }),

    getByDate: publicProcedure
        .input(z.date().optional())
        .query(({ input, ctx }) => {
            return ctx.prisma.booking.findFirst({
                where: { startDate: input },
            });
        }),

    getByUserId: protectedProcedure
        .input(z.string())
        .query(({ input, ctx }) => {
            return ctx.prisma.booking.findMany({ where: { userId: input } });
        }),

    getAllBookingsWithoutReviewsByUserId: protectedProcedure
        .input(z.string())
        .query(({ input, ctx }) => {
            try {
                const bookingsWithoutReviews = ctx.prisma.booking.findMany({
                    where: { userId: input, review: { none: {} } },
                });
                return bookingsWithoutReviews;
            } catch (error) {
                throw new Error("Failed to fetch bookings without reviews.");
            }
        }),

    getAllByUserIdWithReview: protectedProcedure
        .input(z.string())
        .query(({ input, ctx }) => {
            return ctx.prisma.booking.findMany({
                where: { userId: input, review: { some: {} } },
            });
        }),

    create: protectedProcedure
        .input(
            z.object({
                startDate: z.date(),
                endDate: z.date(),
                type: z.string(),
                userId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const data = { ...input, status: "pending" };
                const newBooking = await ctx.prisma.booking.create({
                    data,
                });

                return newBooking;
            }

            throw new Error("Invalid userId");
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                // userId: z.string(),
                startDate: z.date().optional(),
                endDate: z.date().optional(),
                status: z.string().optional(),
                type: z.string().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            // if (ctx.session.user.id === input.userId) {
            const updatedBooking = await ctx.prisma.booking.update({
                where: {
                    id: input.id,
                },
                data: input,
            });

            return updatedBooking;
            // }

            // throw new Error("Invalid userId");
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string(), userId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                await ctx.prisma.booking.delete({
                    where: { id: input.id },
                });

                return "Successfully deleted";
            }

            throw new Error("Invalid userId");
        }),
});
