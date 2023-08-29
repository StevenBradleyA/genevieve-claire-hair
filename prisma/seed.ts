import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    //? Blonding
    await prisma.serviceCategory.create({
        data: {
            name: "Blonding",
            subcategories: {
                create: [
                    {
                        name: "Partial",
                        price: 170,
                        time: 180,
                        bundleTime: 30,
                    },
                    {
                        name: "Full",
                        price: 220,
                        time: 210,
                        bundleTime: 30,
                    },
                ],
            },
        },
    });

    //? All Over Color
    await prisma.serviceCategory.create({
        data: {
            name: "All Over Color",
            subcategories: {
                create: [
                    {
                        name: "Gloss and toner only",
                        price: 50,
                        time: 60,
                        bundleTime: 30,
                    },
                    {
                        name: "Roots only",
                        price: 80,
                        time: 90,
                        bundleTime: 30,
                    },
                    {
                        name: "Roots to ends",
                        price: 115,
                        time: 120,
                        bundleTime: 30,
                    },
                ],
            },
        },
    });

    //? Haircut
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
                    {
                        name: "Transformative",
                        price: 90,
                        time: 90,
                        bundleTime: 60,
                    },
                ],
            },
        },
    });

    //? Styling
    await prisma.serviceCategory.create({
        data: {
            name: "Styling",
            subcategories: {
                create: [
                    {
                        name: "Blowout",
                        price: 45, // starting at
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

    //? Quiet
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

    //? Vivids
    await prisma.serviceCategory.create({
        data: {
            name: "Vivids",
            requireConsult: true,
        },
    });

    //? Color Corrections
    await prisma.serviceCategory.create({
        data: {
            name: "Color Corrections",
            requireConsult: true,
        },
    });

    // //? Geni
    // await prisma.user.create({
    //     data: {
    //         firstName: "Geni",
    //         lastName: "Evanson",
    //         email: "genevieveclare.hair@outlook.com",
    //         isAdmin: true,
    //         isNew: false,
    //     },
    // });

    // //? Zaviar
    // await prisma.user.create({
    //     data: {
    //         firstName: "Zaviar",
    //         lastName: "Brown",
    //         email: "brown.zaviar@gmail.com",
    //         isAdmin: true,
    //         isNew: false,
    //     },
    // });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        void prisma.$disconnect();
    });
