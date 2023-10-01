import { z } from "zod";
import EmailConfirmation from "~/components/Bookings/Confirmation/EmailConfirmation";
import { Resend } from "resend";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

const resend = new Resend(process.env.RESEND_API_KEY);

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
                const data = { ...input, status: "approved" };
                const newBooking = await ctx.prisma.booking.create({
                    data,
                });

                return newBooking;
            }

            throw new Error("Invalid userId");
        }),

    sendEmailConfirmation: protectedProcedure
        .input(
            z.object({
                userEmail: z.string(),
                firstName: z.string(),
                lastName: z.string(),
                type: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { userEmail, firstName, lastName, type } = input;
            try {
                const data = await resend.emails.send({
                    from: "GenevieveClareHair <onboarding@resend.dev>",
                    to: [userEmail],
                    subject: "Hair Appointment Confirmation",
                    react: EmailConfirmation({
                        firstName,
                        lastName,
                        type,
                    }),
                });

                return data; // Assuming you want to return the data sent by the email service.
            } catch (error) {
                throw new Error(error); // Throw an error if the email sending fails.
            }
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
