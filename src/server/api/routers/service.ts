import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export type NormalizedServicesType = {
    [key: string]: {
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
});
