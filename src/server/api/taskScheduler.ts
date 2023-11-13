import { prisma } from "../db";
import { Twilio } from "twilio";
import { env } from "~/env.mjs";

const twilioSid = env.TWILIO_SID_KEY;
const twilioAuth = env.TWILIO_AUTH_TOKEN;
const twilioMessagingService = env.TWILIO_MESSAGING_SERVICE;
const twilioClient = new Twilio(twilioSid, twilioAuth);

const scheduleReminders = async () => {
    console.log("uhhh hellllooooo");
    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);

    const upcomingBookings = await prisma.booking.findMany({
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
        include: {
            user: {
                select: {
                    phoneNumber: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });
    console.log("hello upcoming", upcomingBookings);

    for (const booking of upcomingBookings) {
        const {
            user: { phoneNumber, firstName, lastName },
            type,
            startDate,
        } = booking;

        const displayDate = startDate.toLocaleString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });

        const oneDayBefore = new Date(startDate);
        oneDayBefore.setDate(startDate.getDate() - 1);

        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
        const timeDifference = startDate.getTime() - Date.now();

        if (
            firstName &&
            lastName &&
            phoneNumber &&
            timeDifference > oneDayInMilliseconds
        ) {
            try {
                const reminder = await twilioClient.messages.create({
                    body: `Hello ${firstName} ${lastName}, this is a reminder for your ${type} appointment with Genevieve at ${displayDate}. Thank you!`,
                    to: phoneNumber,
                    from: "+18447346903",
                    sendAt: oneDayBefore,
                    messagingServiceSid: twilioMessagingService,
                    scheduleType: "fixed",
                });

                console.log("Reminder sent:", reminder);
            } catch (error) {
                console.error("Error sending text message:", error);
                throw new Error("Text did not send");
            }
        }
    }
};

const reminderJob = async () => {
    try {
        await scheduleReminders();
        console.log("Reminder job completed successfully");
    } catch (error) {
        console.error("Error in reminder job:", error);
    }
};

console.log("Reminder job scheduled:", reminderJob);
