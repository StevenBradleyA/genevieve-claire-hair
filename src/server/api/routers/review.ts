import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

// TODO want to refactor review router to work with bookings once it is finished :D

export const reviewRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.review.findMany({
            include: {
                user: { select: { name: true } },
            },
        });
    }),

    getByUserId: publicProcedure.input(z.string()).query(({ input, ctx }) => {
        return ctx.prisma.review.findMany({ where: { userId: input } });
    }),

    hasReviewed: publicProcedure
        .input(z.object({ userId: z.string().optional() }))
        .query(({ input: { userId }, ctx }) => {
            if (!userId) return null;
            return ctx.prisma.review.findFirst({ where: { userId } });
        }),

    create: protectedProcedure
        .input(
            z.object({
                text: z.string(),
                starRating: z.number(),
                userId: z.string(),
                bookingId: z.string(),
                images: z.array(
                    z.object({
                        link: z.string(),
                    })
                ),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { text, starRating, userId, bookingId, images } = input;
            if (ctx.session.user.id === userId) {
                const newReview = await ctx.prisma.review.create({
                    data: { text, starRating, userId, bookingId },
                });

                const createdImages = images.map(async (image) => {
                    return ctx.prisma.images.create({
                        data: {
                            link: image.link,
                            resourceType: "REVIEW",
                            resourceId: newReview.id,
                            userId: newReview.userId,
                        },
                    });
                });
                return {
                    newReview,
                    createdImages,
                };
            }

            throw new Error("Invalid userId");
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                text: z.string().optional(),
                starRating: z.number().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const updatedReview = await ctx.prisma.review.update({
                    where: {
                        id: input.id,
                    },
                    data: input,
                });

                return updatedReview;
            }

            throw new Error("Invalid userId");
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string(), userId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                await ctx.prisma.review.delete({ where: { id: input.id } });

                return "Successfully deleted";
            }

            throw new Error("Invalid userId");
        }),
});
