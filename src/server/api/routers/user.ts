import { Input } from "postcss";
import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getAllUsers: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany({
            include: {
                images: {
                    select: {
                        link: true,
                    },
                },
            },
            orderBy: {
                name: "asc",
            },
        });
    }),
    getUserById: publicProcedure.input(z.string()).query(({ input, ctx }) => {
        return ctx.prisma.user.findFirst({
            where: { id: input },
            include: {
                images: {
                    where: {
                        resourceId: input,
                    },
                    select: {
                        link: true,
                    },
                },
            },
        });
    }),
    updateNewUser: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                firstName: z.string(),
                lastName: z.string(),
                notes: z.string(),
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
            const { userId, firstName, lastName, notes, images } = input;
            if (ctx.session.user.id === userId) {
                const updatedUser = await ctx.prisma.user.update({
                    where: { id: ctx.session.user.id },
                    data: { firstName, lastName, notes, isNew: false },
                });

                if (images) {
                    const createdImages = images.map(async (image) => {
                        return ctx.prisma.images.create({
                            data: {
                                link: image.link,
                                resourceType: "USER",
                                resourceId: userId,
                                userId: userId,
                            },
                        });
                    });
                    return {
                        updatedUser,
                        createdImages,
                    };
                }
                return { updatedUser };
            }

            throw new Error("Invalid userId");
        }),

    // updateNewUser: protectedProcedure.mutation(({ ctx }) => {
    //     return ctx.prisma.user.update({
    //         where: { id: ctx.session.user.id },
    //         data: { isNew: false },
    //     });
    // }),
});
