import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export type ServicesType = {
    id: number;
    name: string;
    requireConsult: boolean;
    subcategories: {
        id: number;
        name: string;
        price: number;
        time: number;
        bundleTime: number;
        requireConsult: boolean;
        serviceCategoryId: number;
    }[];
};

export type NormalizedServicesType = {
    [key: string]: ServicesType;
};

export const serviceRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const data = await ctx.prisma.serviceCategory.findMany({
            include: { subcategories: true },
        });

        return data;
    }),

    getAllNormalized: publicProcedure.query(async ({ ctx }) => {
        const data = await ctx.prisma.serviceCategory.findMany({
            include: { subcategories: true },
        });

        const res: NormalizedServicesType = {};

        data.forEach((el) => (res[el.name] = el));

        return res;
    }),

    updateSubcategory: protectedProcedure
        .input(
            z.object({
                id: z.number(),
                name: z.string(),
                price: z.number(),
                time: z.number(),
                bundleTime: z.number(),
                requireConsult: z.boolean(),
                serviceCategoryId: z.number(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const newService = await ctx.prisma.serviceSubcategory.update({
                where: { id: input.id },
                data: input,
            });

            return newService;
        }),
});
