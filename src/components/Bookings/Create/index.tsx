import { api } from "~/utils/api";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useSession } from "next-auth/react";
import { isEqual } from "date-fns";
import type { CalendarOptions } from "~/pages/bookings";
import TimeSlotPicker from "./TimeSlotPicker";

export default function CreateBooking(options: CalendarOptions) {
    const { data: session } = useSession();
    const [date, setDate] = useState<Date>();
    const [timeSlot, setTimeSlot] = useState<number>();
    const { data: check } = api.booking.getByDate.useQuery(date);

    const checkConflicts = () => {
        if (!date) return true;
        if (date && check && isEqual(check.date, date)) return true;
        if (!timeSlot) return true;
        return false;
    };

    const book = (e: React.FormEvent) => {
        e.preventDefault();

        if (session && session.user && session.user.id && date) {
            const data = {
                date,
                userId: session.user.id,
            };

            setDate(undefined);

            return mutate(data);
        } else {
            throw new Error("Hot Toast Incoming!!!");
        }
    };

    const ctx = api.useContext();

    const { mutate } = api.booking.create.useMutation({
        onSuccess: () => {
            void ctx.booking.getByUserId.invalidate();
            void ctx.booking.getAllBookedDates.invalidate();
        },
    });

    return (
        <form
            onSubmit={book}
            className="container flex items-center justify-center px-4 py-16"
        >
            <DayPicker
                mode="single"
                selected={date}
                onSelect={(e) => {
                    setDate(e);
                }}
                className="rounded-lg  bg-white p-1 shadow-2xl"
                {...options}
            />
            <div className="flex w-60 flex-col">
                <TimeSlotPicker
                    date={date}
                    timeSlot={timeSlot}
                    setTimeSlot={setTimeSlot}
                />
                <button
                    disabled={checkConflicts()}
                    className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-blue-600 disabled:bg-slate-300 disabled:text-slate-500"
                >
                    Book now!
                </button>
            </div>
        </form>
    );
}
