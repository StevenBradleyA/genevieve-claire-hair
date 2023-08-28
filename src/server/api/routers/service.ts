import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import type { ServiceCategory, ServiceSubcategory } from "@prisma/client";

type NormalizedDataType = {
    [key: string]: {
        subcategories: {
            id: number;
            name: string;
            price: number;
            time: number;
            bundleTime: number;
            requireConsult: boolean;
            serviceCategoryId: number;
        }[];
    } & {
        id: number;
        name: string;
        requireConsult: boolean;
    };
};

export const serviceRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const data = await ctx.prisma.serviceCategory.findMany({
            include: { subcategories: true },
        });

        const res: NormalizedDataType = {};

        data.forEach((el) => (res[el.name] = el));

        return res;
    }),
});
