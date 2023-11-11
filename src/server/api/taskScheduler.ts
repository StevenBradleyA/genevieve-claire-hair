// npm install node-schedule
// npm install --save-dev @types/node-schedule

import * as schedule from "node-schedule";
import { bookingRouter } from "./routers/booking";
import { appRouter } from "./root";
import { api } from "~/utils/api";
import { prisma } from "../db";

const scheduleReminders = async () => {
    // todo for each booking we need to query for the user first
    // then using that info call the tRPC route for a reminder classification
    // going to need a new tRPC route for reminder texts with a sendAt tho

    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);

    const upcomingBookings = prisma.booking.findMany({
        where: {
            startDate: {
                gte: new Date(),
                lte: oneWeekLater,
            },
            user: {
                phoneNumber: {
                    not: null,
                },
            },
        },
        orderBy: {
            startDate: "asc",
        },
    });

    // for (const booking of upcomingBookings) {
    //     const {
    //         phoneNumber,
    //         firstName,
    //         lastName,
    //         type,
    //         startDate,
    //         displayDate,
    //     } = booking;

    //     const oneDayBefore = new Date(startDate);
    //     oneDayBefore.setDate(startDate.getDate() - 1);

    //     const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    //     try {
    //         const reminder = await twilioClient.messages.create({
    //             body: `Hello ${firstName} ${lastName}, this is a reminder for your ${type} appointment with Genevieve at ${displayDate}. Thank you!`,
    //             to: phoneNumber,
    //             from: "+18447346903",
    //             sendAt: oneDayBefore,
    //             messagingServiceSid: twilioMessagingService,
    //             scheduleType: "fixed",
    //         });

    //         console.log("Reminder sent:", reminder);
    //     } catch (error) {
    //         console.error("Error sending text message:", error);
    //         throw new Error("Text did not send");
    //     }
    // }
};
