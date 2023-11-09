import { z } from "zod";
import EmailConfirmation from "~/components/Bookings/Confirmation/EmailConfirmation";
import { Resend } from "resend";
import { Twilio } from "twilio";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";

const resend = new Resend(env.RESEND_API_KEY);

const twilioSid = env.TWILIO_SID_KEY;
const twilioAuth = env.TWILIO_AUTH_TOKEN;
const twilioMessagingService = env.TWILIO_MESSAGING_SERVICE;
const twilioClient = new Twilio(twilioSid, twilioAuth);

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
                price: z.number(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id) {
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
                startDate: z.date(),
                displayDate: z.string(),
                type: z.string(),
                classification: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const {
                userEmail,
                firstName,
                lastName,
                type,
                startDate,
                displayDate,
                classification,
            } = input;
            try {
                const data = await resend.emails.send({
                    from: "GenevieveClareHair <onboarding@resend.dev>",
                    to: [userEmail],
                    subject: "Hair Appointment Confirmation",
                    react: EmailConfirmation({
                        firstName,
                        lastName,
                        startDate,
                        displayDate,
                        type,
                        classification,
                    }),
                });

                return data;
            } catch (error) {
                throw new Error("Email did not send");
            }
        }),

    sendTextConfirmation: protectedProcedure
        .input(
            z.object({
                phoneNumber: z.string(),
                firstName: z.string(),
                lastName: z.string(),
                startDate: z.date(),
                displayDate: z.string(),
                type: z.string(),
                classification: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const {
                phoneNumber,
                firstName,
                lastName,
                type,
                startDate,
                displayDate,
                classification,
            } = input;
            const oneDayBefore = new Date(startDate);
            oneDayBefore.setDate(startDate.getDate() - 1);

            const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
            const timeDifference = startDate.getTime() - Date.now();

            if (timeDifference > oneDayInMilliseconds) {
                try {
                    const message = await twilioClient.messages.create({
                        body: `Hello ${firstName} ${lastName}, your ${type} appointment with Genevieve at ${displayDate} is confirmed. Thank you!`,
                        to: phoneNumber,
                        from: "+18447346903",
                    });

                    const reminder = await twilioClient.messages.create({
                        body: `Hello ${firstName} ${lastName}, this is a reminder for your ${type} appointment with Genevieve at ${displayDate}. Thank you!`,
                        to: phoneNumber,
                        from: "+18447346903",
                        sendAt: oneDayBefore,
                        messagingServiceSid: twilioMessagingService,
                        scheduleType: "fixed",
                    });

                    return { message, reminder };
                } catch (error) {
                    console.error("Error sending text message:", error);
                    throw new Error("Text did not send");
                }
            } else {
                try {
                    const message = await twilioClient.messages.create({
                        body: `Hello ${firstName} ${lastName}, your ${type} appointment with Genevieve at ${displayDate} is confirmed. Thank you!`,
                        to: phoneNumber,
                        from: "+18447346903",
                    });

                    return { message };
                } catch (error) {
                    console.error("Error sending text message:", error);
                    throw new Error("Text did not send");
                }
            }
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                startDate: z.date().optional(),
                endDate: z.date().optional(),
                status: z.string().optional(),
                type: z.string().optional(),
                price: z.number().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const updatedBooking = await ctx.prisma.booking.update({
                where: {
                    id: input.id,
                },
                data: input,
            });

            return updatedBooking;
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
