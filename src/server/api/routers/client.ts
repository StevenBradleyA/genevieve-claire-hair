import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const clientRouter = createTRPCRouter({
    updateNewClient: protectedProcedure.mutation(({ ctx }) => {
        return ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: { isNew: false },
        });
    }),
});
