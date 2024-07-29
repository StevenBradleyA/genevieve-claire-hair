import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.schedule.deleteMany();

    // Blonding
    await prisma.serviceCategory.create({
        data: {
            name: "Blonding",
            subcategories: {
                create: [
                    {
                        name: "Partial",
                        price: 200,
                        time: 180,
                        bundleTime: 30,
                    },
                    {
                        name: "Full",
                        price: 250,
                        time: 210,
                        bundleTime: 30,
                    },
                ],
            },
        },
    });

    // All Over Color
    await prisma.serviceCategory.create({
        data: {
            name: "All Over Color",
            subcategories: {
                create: [
                    {
                        name: "Gloss and toner only",
                        price: 65,
                        time: 60,
                        bundleTime: 30,
                    },
                    {
                        name: "Roots only",
                        price: 90,
                        time: 90,
                        bundleTime: 30,
                    },
                    {
                        name: "Roots to ends",
                        price: 135,
                        time: 120,
                        bundleTime: 30,
                    },
                ],
            },
        },
    });

    // Haircut
    await prisma.serviceCategory.create({
        data: {
            name: "Haircut",
            subcategories: {
                create: [
                    {
                        name: "Buzz",
                        price: 20,
                        time: 20,
                        bundleTime: 30,
                    },
                    {
                        name: "Short",
                        price: 35,
                        time: 35,
                        bundleTime: 30,
                    },
                    {
                        name: "Long",
                        price: 60,
                        time: 60,
                        bundleTime: 30,
                    },
                ],
            },
        },
    });

    // Styling
    await prisma.serviceCategory.create({
        data: {
            name: "Styling",
            subcategories: {
                create: [
                    {
                        name: "Blowout",
                        price: 45,
                        time: 40,
                        bundleTime: 60,
                    },
                    {
                        name: "Special Event",
                        price: 65,
                        time: 90,
                        bundleTime: 60,
                    },
                    {
                        name: "Bridal/Wedding",
                        price: 90,
                        time: 90,
                        bundleTime: 60,
                        requireConsult: true,
                    },
                ],
            },
        },
    });

    // Quiet
    await prisma.serviceCategory.create({
        data: {
            name: "Quiet",
            subcategories: {
                create: [
                    {
                        name: "Music",
                        price: 0,
                        time: 0,
                        bundleTime: 0,
                    },
                    {
                        name: "No Music",
                        price: 0,
                        time: 0,
                        bundleTime: 0,
                    },
                ],
            },
        },
    });

    // Vivids
    await prisma.serviceCategory.create({
        data: {
            name: "Vivids",
            price: 150,
            requireConsult: true,
        },
    });

    // Color Corrections
    await prisma.serviceCategory.create({
        data: {
            name: "Color Corrections",
            price: 175,
            requireConsult: true,
        },
    });

    const scheduleData = [
        { dayOfWeek: 0, startTime: 0, endTime: 0 },
        { dayOfWeek: 1, startTime: 9, endTime: 13 },
        { dayOfWeek: 2, startTime: 9, endTime: 17 },
        { dayOfWeek: 3, startTime: 10, endTime: 19 },
        { dayOfWeek: 4, startTime: 10, endTime: 19 },
        { dayOfWeek: 5, startTime: 10, endTime: 19 },
        { dayOfWeek: 6, startTime: 0, endTime: 0 },
    ];

    for (const data of scheduleData) {
        await prisma.schedule.create({
            data,
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        void prisma.$disconnect();
    });
