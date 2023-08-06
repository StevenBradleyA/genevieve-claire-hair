//! Lightening Service[Balayage, Bleach and Tone, Baby Lights, Highlights] must disable each other
//! All over color bundled only allows roots only

/** Haircut, Color, Highlight
 *
 * Highest price point shown sub selections first - Highlight
 * Choose full or partial
 * Color shown next
 * Only "roots only" available (Roots to Ends and Gloss/Toner disabled)
 * Haircuts shown next
 * All choices shown
 */

/**
 * Blonding includes highlights, balayage, baby lights, bleach and tone (User input for more info)
 * Full - $220 => 360, Partial - $170 => 310
 * 
 * Any bundles are - $10
 */

const allServices: { [key: string]: any } = {
    haircut: {
        name: "Haircut",
        select: false,
        rate: 60,
        bundleTime: 30,
        buzz: {
            name: "Buzz",
            select: false,
            time: 20,
            price: 20,
        },
        short: {
            name: "Short - Shoulder and up",
            select: false,
            time: 35,
            price: 35,
        },
        long: {
            name: "Long - Collarbone and down",
            select: false,
            time: 60,
            price: 60,
        },
        creative: {
            name: "Creative/Transformation",
            select: false,
            time: 90,
            price: 90,
            bundleTime: 60,
        },
    },
    allOverColor: {
        name: "All Over Color",
        select: false,
        rate: 80,
        bundleTime: 30,
        glossTonerOnly: {
            name: "Gloss and toner only",
            select: false,
            time: 60,
            price: 50,
        },
        rootsOnly: {
            name: "Roots only",
            select: false,
            time: 90,
            price: 80,
            allow: true,
        },
        rootsToEnds: {
            name: "Roots to ends",
            select: false,
            time: 120,
            price: 115,
        },
    },
    vivids: {
        name: "Vivids",
        select: false,
        rate: 110, // per hour
        price: 135,
        requireConsult: true,
    },
    colorCorrections: {
        name: "Color Corrections",
        select: false,
        rate: 150, // per hour
        price: 150,
        requireConsult: true,
    },
    styling: {
        name: "Styling",
        select: false,
        rate: 61,
        bundleTime: 60,
        blowout: {
            name: "Blowout",
            select: false,
            time: 40,
            price: 45, // starting at
        },
        specialEvent: {
            name: "Special Event - Prom, Homecoming, Senior pics, Formal",
            select: false,
            time: 90,
            price: [65, 90],
            allow: true,
        },
        bridal: {
            name: "Bridal/Wedding",
            select: false,
            allow: true,
            requireConsult: true,
        },
    },
    extensions: {
        // Geni manually adds only
        name: "Extensions",
        select: false,
        rate: 70,
        bundleTime: 30,
        full: {
            name: "Full application",
            select: false,
            requireConsult: true,
        },
        moveUp: {
            name: "Maintenance move up",
            select: false,
            time: 90,
            price: 105,
        },
        removal: {
            name: "Removal",
            select: false,
            time: 60,
            price: 70,
        },
    },

    quiet: {
        name: "Quiet Appointment",
        select: false,
        rate: 0,
    },
};

// highlights: {
//     name: "Highlights",
//     select: false,
//     rate: 95,
//     disable: ["balayage", "bleachTone", "babyLights"],
//     partial: {
//         name: "Partial",
//         select: false,
//         time: 150,
//         price: 140,
//     },

//     full: {
//         name: "Full",
//         select: false,
//         time: 180,
//         price: 220,
//     },
// },
// balayage: {
//     name: "Balayage",
//     select: false,
//     rate: 95,
//     disable: ["bleachTone", "babyLights", "highlights"],
//     partial: {
//         name: "Partial",
//         select: false,
//         time: 180,
//         price: 215,
//     },
//     full: {
//         name: "Full",
//         select: false,
//         time: 180,
//         price: 260,
//     },
// },
// babyLights: {
//     name: "Baby Lights",
//     select: false,
//     rate: 100,
//     disable: ["balayage", "bleachTone", "highlights"],
//     partial: {
//         name: "Partial",
//         select: false,
//         time: 210,
//         price: 250,
//     },
//     full: {
//         name: "Full",
//         select: false,
//         time: 270,
//         price: 290,
//     },
// },
// bleachTone: {
//     name: "Bleach & Tone",
//     select: false,
//     rate: 85,
//     disable: ["balayage", "allOverColor", "babyLights", "highlights"],
//     halfInch: {
//         name: "Growouts: 1/2 inch or less",
//         select: false,
//         time: 150,
//         price: 140,
//     },
//     twoInch: {
//         name: "Growouts: 1/2 inch to 2 inches",
//         select: false,
//         time: 180,
//         price: 190,
//         message: true,
//     },
//     moreThanTwo: {
//         name: "Growouts: 2 inches or more",
//         select: false,
//         requireConsult: true,
//     },
// },
