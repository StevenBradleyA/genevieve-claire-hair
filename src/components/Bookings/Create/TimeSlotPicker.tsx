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
import type { BookedDateType, BookingDetailsType } from "./";
import { useMobile } from "~/components/MobileContext";
import type { DaysType, ScheduleType } from "~/server/api/routers/schedule";

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

export default function TimeSlotPicker({
    date,
    details,
    schedule,
    bookedDates,
    timeSlot,
    setTimeSlot,
}: {
    date: Date | undefined;
    details: BookingDetailsType;
    schedule: ScheduleType;
    bookedDates: BookedDateType[];
    timeSlot: Date | undefined;
    setTimeSlot: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
    const [currTime, setCurrTime] = useState<Date[]>();
    const { isMobile } = useMobile();

    /**
     * Monday: 9am - 1pm
     * Tuesday: 9am - 5pm
     * Wed-Fri: 10am - 7pm
     */

    // const [schedule, setSchedule] = useState<{ [key: number]: number[] }>({
    //     1: [9, 13],
    //     2: [9, 17],
    //     3: [10, 19],
    //     4: [10, 19],
    //     5: [10, 19],
    // });

    // TODO WEEKENDS not showing up even if in schedule. Not sure if disabled or something...?

    useEffect(() => {
        // TODO: Reset time slot if new selection doesn't have that time slot
        setTimeSlot(undefined);

        if (date && schedule) {
            const { startTime, endTime } = schedule[date.getDay() as DaysType];

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
    }, [date, setTimeSlot, schedule]);

    return (
        <div className="flex flex-wrap justify-between gap-1 align-top">
            {currTime &&
                currTime.map((el) => {
                    if (checkOverlappingBooking(el, bookedDates, details))
                        return null;

                    const hour = el.getHours();
                    const minutes = `${el.getMinutes() || "00"}`;
                    const time =
                        hour >= 13
                            ? `${hour - 12}:${minutes} pm`
                            : `${hour}:${minutes} am`;

                    return isMobile ? (
                        <div
                            onClick={() => {
                                setTimeSlot(el);
                                console.log(el);
                            }}
                            className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-full text-[9px] font-semibold transition ${
                                timeSlot === el
                                    ? "bg-violet-300 text-white shadow-md"
                                    : "bg-darkGlass text-white shadow-md hover:bg-violet-100 hover:text-violet-600"
                            } p-1 shadow-2xl `}
                            key={time}
                        >
                            {time}
                        </div>
                    ) : (
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
                })}
        </div>
    );
}
