import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export type ServicesType = {
    id: number;
    name: string;
    price: number | null;
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

type PricesWithObjects = "Haircut" | "All Over Color" | "Blonding";

type PlainPrices = "Vivids" | "Color Corrections";

export type AllPriceOptionsType = PricesWithObjects | PlainPrices;

type DynamicPriceType = {
    [key in PricesWithObjects]: {
        [key: string]: number;
    };
};

type StaticPriceType = {
    [key in PlainPrices]: number;
};

export type PricesType = DynamicPriceType & StaticPriceType;

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

    getPrices: publicProcedure.query(async ({ ctx }) => {
        const data = await ctx.prisma.serviceCategory.findMany({
            include: {
                subcategories: {
                    select: {
                        name: true,
                        price: true,
                    },
                },
            },
        });

        const res = {} as PricesType;

        data.forEach((el) => {
            el.subcategories.forEach((sub) => {
                if (!res[el.name as AllPriceOptionsType]) {
                    res[el.name as PricesWithObjects] = {};
                }
                res[el.name as PricesWithObjects][sub.name] = sub.price;
            });

            if (!el.subcategories.length && el.price) {
                res[el.name as PlainPrices] = el.price;
            }
        });

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

    updateMainCategory: protectedProcedure
        .input(
            z.object({
                id: z.number(),
                name: z.string(),
                price: z.number(),
                requireConsult: z.boolean(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const newService = await ctx.prisma.serviceCategory.update({
                where: { id: input.id },
                data: input,
            });

            return newService;
        }),
});
