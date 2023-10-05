import "react-day-picker/dist/style.css";
import type { DateRange } from "react-day-picker";
import type { CalendarOptions } from "../../Bookings/Create";
import type { DaysType, ScheduleType } from "~/server/api/routers/schedule";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import SetHours from "./SetHours";

const createCalendarOptions = (): CalendarOptions => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const yesterday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
    );

    const disabled = [
        { from: startOfMonth, to: yesterday },
        // {
        //     dayOfWeek: Object.keys(schedule)
        //         .filter(
        //             (el) =>
        //                 !schedule[Number(el) as DaysType].startTime ||
        //                 !schedule[Number(el) as DaysType].endTime
        //         )
        //         .map((el) => Number(el)),
        // },
    ];

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

export default function CreateTimeOff() {
    const [dateRange, setDateRange] = useState<DateRange>();

    console.log(dateRange);

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
