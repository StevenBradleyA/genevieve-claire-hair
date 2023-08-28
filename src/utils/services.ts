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
 * Any bundles are minus $10
 * 
 *  Blonding: [
        "Highlights",
        "Balayage",
        "Baby lights",
        "Bleach and tone",
        "Unsure",
    ],
 */

export type ServiceDetailsType = {
    time: number;
    price: number;
    bundleTime: number;
};

type ServiceType = {
    [key: string]: ServiceDetailsType;
};

type AllServicesType = {
    Blonding: ServiceType;
    "All Over Color": ServiceType;
    Haircut: ServiceType;
    Styling: ServiceType;
};

export const allServices: AllServicesType = {
    Blonding: {
        Partial: {
            price: 170,
            time: 180,
            bundleTime: 30,
        },
        Full: {
            price: 220,
            time: 210,
            bundleTime: 30,
        },
    },
    "All Over Color": {
        "Gloss and toner only": {
            price: 50,
            time: 60,
            bundleTime: 30,
        },
        "Roots only": {
            price: 80,
            time: 90,
            bundleTime: 30,
        },
        "Roots to ends": {
            price: 115,
            time: 120,
            bundleTime: 30,
        },
    },
    Haircut: {
        Buzz: {
            price: 20,
            time: 20,
            bundleTime: 30,
        },
        Short: {
            price: 35,
            time: 35,
            bundleTime: 30,
        },
        Long: {
            price: 60,
            time: 60,
            bundleTime: 30,
        },
        Transformative: {
            price: 90,
            time: 90,
            bundleTime: 60,
        },
    },
    Styling: {
        Blowout: {
            price: 45, // starting at
            time: 40,
            bundleTime: 60,
        },
        "Special Event": {
            price: 65,
            time: 90,
            bundleTime: 60,
        },
    },
};

//? Geni only
const legacy = {
    extensions: {
        // Geni manually adds only
        name: "Extensions",
        rate: 70,
        bundleTime: 30,
        full: {
            name: "Full application",
            requireConsult: true,
        },
        moveUp: {
            name: "Maintenance move up",
            time: 90,
            price: 105,
        },
        removal: {
            name: "Removal",
            time: 60,
            price: 70,
        },
    },
    vivids: {
        name: "Vivids",
        rate: 110, // per hour
        price: 135,
        requireConsult: true,
    },
    colorCorrections: {
        name: "Color Corrections",
        rate: 150, // per hour
        price: 150,
        requireConsult: true,
    },
};

//! Old - no longer needed
// highlights: {
//     name: "Highlights",
//     select: false,
//     rate: 95,
//     disable: ["balayage", "bleachTone", "babyLights"],
//     partial: {
//         name: "Partial",
//
//         time: 150,
//         price: 140,
//     },

//     full: {
//         name: "Full",
//
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
//
//         time: 180,
//         price: 215,
//     },
//     full: {
//         name: "Full",
//
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
//
//         time: 210,
//         price: 250,
//     },
//     full: {
//         name: "Full",
//
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
//
//         time: 150,
//         price: 140,
//     },
//     twoInch: {
//         name: "Growouts: 1/2 inch to 2 inches",
//
//         time: 180,
//         price: 190,
//         message: true,
//     },
//     moreThanTwo: {
//         name: "Growouts: 2 inches or more",
//
//         requireConsult: true,
//     },
// },
