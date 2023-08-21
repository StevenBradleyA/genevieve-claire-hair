import {
    addHours,
    addMinutes,
    isBefore,
    isAfter,
    isToday,
    startOfHour,
    isEqual,
} from "date-fns";
import { useEffect, useState } from "react";
import type { BookedDateType } from "./";

/**
 * Monday: 9am - 1pm
 * Tuesday: 9am - 5pm
 * Wed-Fri: 10am - 7pm
 */

const schedule: { [key: number]: number[] } = {
    1: [9, 13],
    2: [9, 17],
    3: [10, 19],
    4: [10, 19],
    5: [10, 19],
};

const createTimeIntervals = (start: Date, end: Date) => {
    const timeArray = [];
    let currTime = start;

    while (currTime <= end) {
        timeArray.push(currTime);
        currTime = addMinutes(currTime, 30);
    }

    return timeArray;
};

const checkOverlappingBooking = (date: Date, bookedDates: BookedDateType[]) => {
    for (const { startDate, endDate } of bookedDates) {
        if (isAfter(date, startDate) && isBefore(date, endDate)) return true;
        if (isEqual(date, startDate) || isEqual(date, endDate)) return true;
    }

    return false;
};

export default function TimeSlotPicker({
    date,
    details,
    bookedDates,
    timeSlot,
    setTimeSlot,
}: {
    date: Date | undefined;
    details: {
        totalPrice: number;
        totalTime: number;
        services: string;
    };
    bookedDates: BookedDateType[];
    timeSlot: Date | undefined;
    setTimeSlot: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
    const [currTime, setCurrTime] = useState<Date[]>();

    useEffect(() => {
        // TODO: Reset time slot if new selection doesn't have that time slot
        setTimeSlot(undefined);

        if (date) {
            const [startTime, endTime] = schedule[date.getDay()] as number[];

            if (startTime && endTime) {
                let start = new Date(date.getTime());
                const end = new Date(date.getTime());
                end.setHours(endTime);

                if (isToday(date)) {
                    start = startOfHour(addHours(new Date(), 1));
                } else {
                    start.setHours(startTime);
                }

                if (isBefore(start, end))
                    setCurrTime(createTimeIntervals(start, end));
                else setCurrTime([]);
            }

            return;
        } else setCurrTime(undefined);
    }, [date, setTimeSlot]);

    return (
        <div className="flex flex-wrap justify-between gap-1 align-top">
            {currTime &&
                currTime.map((el) => {
                    if (checkOverlappingBooking(el, bookedDates)) return null;

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
                            className={`cursor-pointer rounded ${
                                timeSlot === el ? "bg-emerald-400" : "bg-white"
                            } p-1 shadow-2xl `}
                            key={time}
                        >
                            {time}
                        </div>
                    );
                })}
        </div>
    );
}
