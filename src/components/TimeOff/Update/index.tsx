import type { DateRange } from "react-day-picker";
import type { CalendarOptions } from "../../Bookings/Create";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import SetHours from "../Create/SetHours";
import type { TimeOff } from "@prisma/client";

const createCalendarOptions = (): CalendarOptions => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
    );

    const disabled = [{ from: startOfMonth, to: yesterday }];

    const options = {
        disabled,
        fromYear: today.getFullYear(),
        fromMonth: today,
        modifiers: { booked: [] },
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

export default function UpdateTimeOff({ timeOff }: { timeOff: TimeOff }) {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: timeOff.startDate,
        to: timeOff.endDate,
    });

    return (
        <div className="flex items-center justify-center gap-10 rounded-2xl bg-darkGlass p-10 text-white shadow-lg">
            <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                className="rounded-lg bg-darkGlass text-white shadow-2xl"
                {...createCalendarOptions()}
            />

            <SetHours dateRange={dateRange} setDateRange={setDateRange} />
        </div>
    );
}
