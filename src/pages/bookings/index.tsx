import { api } from "~/utils/api";
import CreateBooking from "../../components/Bookings/Create";
import DisplayBookings from "../../components/Bookings/Display";
import { useSession } from "next-auth/react";
import FormController from "~/components/FormController";
import type { Matcher } from "react-day-picker";

export interface CalendarOptions {
    disabled: Matcher[];
    fromYear: number;
    fromMonth: Date;
    modifiers: {
        booked: Date[];
    };
    modifiersStyles: {
        booked: {
            color: string;
            fontWeight: string;
            textDecoration: string;
        };
    };
    fixedWeeks: boolean;
    showOutsideDays: boolean;
}

const createCalendarOptions = (booked: Date[]): CalendarOptions => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
    );

    const disabled = [
        ...booked,
        { from: startOfMonth, to: yesterday },
        { dayOfWeek: [0, 6] },
    ];

    const options = {
        disabled,
        fromYear: today.getFullYear(),
        fromMonth: today,
        modifiers: { booked },
        modifiersStyles: {
            booked: {
                color: "red",
                fontWeight: "bolder",
                textDecoration: "line-through",
            },
        },
        fixedWeeks: true,
        showOutsideDays: true,
    };

    return options;
};

// Redirect to sign up & new client form

export default function Booking() {
    const { data: session } = useSession();
    let { data: pfBangs } = api.booking.getPresentFutureBookings.useQuery();

    if (!pfBangs) pfBangs = [];

    return (
        <>
            {session && (
                <>
                    <FormController name="NewBooking" />
                    <CreateBooking {...createCalendarOptions(pfBangs)} />
                    <DisplayBookings session={session} />
                </>
            )}
        </>
    );
}
