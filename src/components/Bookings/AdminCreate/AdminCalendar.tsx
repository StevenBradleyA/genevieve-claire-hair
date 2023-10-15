import { DayPicker } from "react-day-picker";
import type { BookedDateType, CalendarOptions } from "../Create";
import AdminTimeSlots from "./AdminTimeSlots";

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

export default function AdminCalendar({
    date,
    setDate,
    timeSlot,
    setTimeSlot,
    totalTime,
    bookedDates,
}: {
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    timeSlot: Date | undefined;
    setTimeSlot: React.Dispatch<React.SetStateAction<Date | undefined>>;
    totalTime: number;
    bookedDates: BookedDateType[];
}) {
    return (
        <div className="flex items-center justify-center gap-10 rounded-2xl bg-darkGlass p-10 text-lg shadow-lg">
            <DayPicker
                mode="single"
                selected={date}
                onSelect={(e) => {
                    setDate(e);
                }}
                className="rounded-lg bg-darkGlass shadow-2xl "
                {...createCalendarOptions()}
            />
            <div className="flex w-60 flex-col">
                <AdminTimeSlots
                    date={date}
                    totalTime={totalTime}
                    bookedDates={bookedDates}
                    timeSlot={timeSlot}
                    setTimeSlot={setTimeSlot}
                />
            </div>
        </div>
    );
}
