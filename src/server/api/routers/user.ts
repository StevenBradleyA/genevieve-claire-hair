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

    updateNewUser: protectedProcedure.mutation(({ ctx }) => {
        return ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: { isNew: false },
        });
    }),
});
