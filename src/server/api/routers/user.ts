import { compare } from "bcryptjs";
import { z } from "zod";
import { env } from "~/env.mjs";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getAllUsers: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany({
            where: { isNew: false },
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
                phoneNumber: z.string().optional(),
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
            const { userId, firstName, lastName, notes, images, phoneNumber } =
                input;
            if (ctx.session.user.id === userId || ctx.session.user.isAdmin) {
                const updatedUser = await ctx.prisma.user.update({
                    where: { id: ctx.session.user.id },
                    data: {
                        firstName,
                        lastName,
                        notes,
                        phoneNumber: phoneNumber === "" ? null : phoneNumber,
                        isNew: false,
                    },
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

    grantAdmin: publicProcedure
        .input(z.string())
        .mutation(async ({ input: hashPass, ctx }) => {
            const correct = await compare(env.NEXT_PUBLIC_POGWORD, hashPass);

            if (correct) {
                const updatedUser = await ctx.prisma.user.update({
                    where: { id: ctx.session?.user.id },
                    data: {
                        isAdmin: true,
                        isNew: false,
                    },
                });
                return updatedUser ? "Success" : "Error";
            } else {
                return "Incorrect";
            }
        }),
});
