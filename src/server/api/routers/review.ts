import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { removeFileFromS3 } from "../utils";

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
                images: z
                    .array(
                        z.object({
                            link: z.string(),
                        })
                    )
                    .optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { text, starRating, userId, bookingId, images } = input;
            if (ctx.session.user.id === userId) {
                const newReview = await ctx.prisma.review.create({
                    data: { text, starRating, userId, bookingId },
                });
                if (images) {
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
                return { newReview };
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
                bookingId: z.string(),
                deleteImageIds: z.array(z.string()).optional(),
                images: z
                    .array(
                        z.object({
                            link: z.string(),
                        })
                    )
                    .optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, userId, text, starRating, deleteImageIds, images } =
                input;

            if (ctx.session.user.id === userId) {
                const updatedReview = await ctx.prisma.review.update({
                    where: {
                        id: id,
                    },
                    data: { text, starRating },
                });

                if (images && images.length > 0) {
                    await Promise.all(
                        images.map(async (image) => {
                            return ctx.prisma.images.create({
                                data: {
                                    link: image.link,
                                    resourceType: "REVIEW",
                                    resourceId: id,
                                    userId: userId,
                                },
                            });
                        })
                    );
                }
                if (deleteImageIds && deleteImageIds.length > 0) {
                    const images = await ctx.prisma.images.findMany({
                        where: {
                            id: { in: deleteImageIds },
                        },
                    });
                    const removeFilePromises = images.map(async (image) => {
                        try {
                            await removeFileFromS3(image.link);
                        } catch (err) {
                            console.error(
                                `Failed to remove file from S3: ${err}`
                            );
                            throw new Error(
                                `Failed to remove file from S3: ${err}`
                            );
                        }
                    });

                    await Promise.all(removeFilePromises);

                    await ctx.prisma.images.deleteMany({
                        where: {
                            id: { in: deleteImageIds },
                        },
                    });
                }

                return updatedReview;
            }

            throw new Error("Invalid userId");
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                imageIds: z.array(z.string()),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { imageIds, userId } = input;
            if (ctx.session.user.id === userId) {
                if (imageIds.length > 0) {
                    const images = await ctx.prisma.images.findMany({
                        where: {
                            id: { in: imageIds },
                        },
                    });
                    const removeFilePromises = images.map(async (image) => {
                        try {
                            await removeFileFromS3(image.link);
                        } catch (err) {
                            console.error(
                                `Failed to remove file from S3: ${err}`
                            );
                            throw new Error(
                                `Failed to remove file from S3: ${err}`
                            );
                        }
                    });

                    await Promise.all(removeFilePromises);

                    await ctx.prisma.images.deleteMany({
                        where: {
                            id: { in: imageIds },
                        },
                    });
                }

                await ctx.prisma.review.delete({ where: { id: input.id } });

                return "Successfully deleted";
            }

            throw new Error("Invalid userId");
        }),
});
