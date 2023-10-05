import {
    addHours,
    addMinutes,
    isBefore,
    isAfter,
    isToday,
    startOfHour,
    isEqual,
    endOfDay,
} from "date-fns";
import { useEffect, useState } from "react";
import type { BookedDateType, BookingDetailsType } from "../Create";

const createTimeIntervals = (start: Date, end: Date) => {
    const timeArray = [];
    let currTime = start;

    while (currTime <= end) {
        timeArray.push(currTime);
        currTime = addMinutes(currTime, 30);
    }

    return timeArray;
};

const checkOverlappingBooking = (
    date: Date,
    bookedDates: BookedDateType[],
    details: BookingDetailsType
) => {
    const endOfBooking = addMinutes(date, details.totalTime);

    for (const { startDate, endDate } of bookedDates) {
        // Check if new start is within existing booking times
        if (isAfter(date, startDate) && isBefore(date, endDate)) return true;

        // Check if new start is equal to existing booking times
        if (isEqual(date, startDate) || isEqual(date, endDate)) return true;

        // Check if new end is within existing booking times
        if (isAfter(endOfBooking, startDate) && isBefore(endOfBooking, endDate))
            return true;

        // Check if new end is equal to existing booking times
        if (isEqual(endOfBooking, startDate) || isEqual(endOfBooking, endDate))
            return true;

        // Check if new times surround existing booking times
        if (isBefore(date, startDate) && isAfter(endOfBooking, endDate))
            return true;
    }

    return false;
};

export default function AdminTimeSlots({
    date,
    details,
    bookedDates,
    timeSlot,
    setTimeSlot,
}: {
    date: Date | undefined;
    details: BookingDetailsType;
    bookedDates: BookedDateType[];
    timeSlot: Date | undefined;
    setTimeSlot: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
    const [currTime, setCurrTime] = useState<Date[]>();

    useEffect(() => {
        // TODO: Reset time slot if new selection doesn't have that time slot
        setTimeSlot(undefined);

        if (date) {
            let start = new Date(date.getTime());
            const end = endOfDay(new Date(date.getTime()));

            if (isToday(date)) {
                start = startOfHour(addHours(new Date(), 1));
            }

            if (isBefore(start, end))
                setCurrTime(createTimeIntervals(start, end));
            else setCurrTime([]);
        } else setCurrTime(undefined);
    }, [date, setTimeSlot]);

    let renderTimes;

    if (currTime) {
        renderTimes = currTime.map((el) => {
            if (checkOverlappingBooking(el, bookedDates, details)) return null;

            const hour = el.getHours();
            const minutes = `${el.getMinutes() || "00"}`;
            const time =
                hour >= 13
                    ? `${hour - 12}:${minutes} pm`
                    : `${hour}:${minutes} am`;

            return (
                <div
                    onClick={() => {
                        setTimeSlot(el);
                        console.log(el);
                    }}
                    className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-full text-[10px] font-semibold transition ${
                        timeSlot === el
                            ? "bg-violet-300 text-white shadow-md"
                            : "bg-darkGlass text-white shadow-md hover:bg-violet-100 hover:text-violet-600"
                    } p-1 shadow-2xl `}
                    key={time}
                >
                    {time}
                </div>
            );
        });

        if (!renderTimes.some((time) => time))
            renderTimes = <div className="m-auto">No available time slots</div>;
    }

    return (
        <div className="flex h-96 flex-wrap justify-between gap-1 overflow-y-scroll align-top">
            {currTime && renderTimes}
        </div>
    );
}
