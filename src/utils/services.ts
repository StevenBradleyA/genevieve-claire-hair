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

export const allServices = {
    Haircut: {
        buzz: {
            name: "Buzz",
            selected: false,
            time: 20,
            bundleTime: 20,
            price: 20,
        },
        short: {
            name: "Short - Shoulder and up",
            selected: false,
            time: 35,
            bundleTime: 30,
            price: 35,
        },
        long: {
            name: "Long - Collarbone and down",
            selected: false,
            time: 60,
            bundleTime: 30,
            price: 60,
        },
        creative: {
            name: "Creative/Transformation",
            selected: false,
            time: 90,
            bundleTime: 60,
            price: 90,
        },
    },
    "All Over Color": {
        glossTonerOnly: {
            name: "Gloss and toner only",
            selected: false,
            time: 60,
            bundleTime: null,
            price: 50,
        },
        rootsOnly: {
            name: "Roots only",
            selected: false,
            time: 90,
            bundleTime: 30,
            price: 80,
        },
        rootsToEnds: {
            name: "Roots to ends",
            selected: false,
            time: 120,
            bundleTime: null,
            price: 115,
        },
    },
    Blonding: {
        
    },

    Vivids: {
        name: "Vivids",
        price: 135,
        requireConsult: true,
    },
    "Color Corrections": {
        name: "Color Corrections",
        price: 150,
        requireConsult: true,
    },
    Styling: {
        name: "Styling",
        blowout: {
            name: "Blowout",
            selected: false,
            time: 40,
            bundleTime: 60,
            price: 45,
        },
        specialEvent: {
            name: "Special Event - Prom, Homecoming, Senior pics, Formal",
            selected: false,
            time: 90,
            bundleTime: 60,
            price: [65, 90],
        },
        bridal: {
            name: "Bridal/Wedding",
            selected: false,
            time: null,
            bundleTime: null,
            price: null,
            requireConsult: true,
        },
    },
    Quiet: {
        name: "Quiet Appointment",
    },
    Extensions: {
        // Geni manually adds only
        name: "Extensions",
        rate: 70,
        bundleTime: 30,
        full: {
            name: "Full application",
            selected: false,
            requireConsult: true,
        },
        moveUp: {
            name: "Maintenance move up",
            selected: false,
            time: 90,
            price: 105,
        },
        removal: {
            name: "Removal",
            selected: false,
            time: 60,
            price: 70,
        },
    },
};

// highlights: {
//     name: "Highlights",
//     selected: false,
//     rate: 95,
//     disable: ["balayage", "bleachTone", "babyLights"],
//     partial: {
//         name: "Partial",
//         selected: false,
//         time: 150,
//         price: 140,
//     },

//     full: {
//         name: "Full",
//         selected: false,
//         time: 180,
//         price: 220,
//     },
// },
// balayage: {
//     name: "Balayage",
//     selected: false,
//     rate: 95,
//     disable: ["bleachTone", "babyLights", "highlights"],
//     partial: {
//         name: "Partial",
//         selected: false,
//         time: 180,
//         price: 215,
//     },
//     full: {
//         name: "Full",
//         selected: false,
//         time: 180,
//         price: 260,
//     },
// },
// babyLights: {
//     name: "Baby Lights",
//     selected: false,
//     rate: 100,
//     disable: ["balayage", "bleachTone", "highlights"],
//     partial: {
//         name: "Partial",
//         selected: false,
//         time: 210,
//         price: 250,
//     },
//     full: {
//         name: "Full",
//         selected: false,
//         time: 270,
//         price: 290,
//     },
// },
// bleachTone: {
//     name: "Bleach & Tone",
//     selected: false,
//     rate: 85,
//     disable: ["balayage", "allOverColor", "babyLights", "highlights"],
//     halfInch: {
//         name: "Growouts: 1/2 inch or less",
//         selected: false,
//         time: 150,
//         price: 140,
//     },
//     twoInch: {
//         name: "Growouts: 1/2 inch to 2 inches",
//         selected: false,
//         time: 180,
//         price: 190,
//         message: true,
//     },
//     moreThanTwo: {
//         name: "Growouts: 2 inches or more",
//         selected: false,
//         requireConsult: true,
//     },
// },
