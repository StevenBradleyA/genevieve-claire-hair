import {
    addHours,
    addMinutes,
    eachHourOfInterval,
    endOfDay,
    isBefore,
    isToday,
    startOfHour,
} from "date-fns";
import { useEffect, useState } from "react";

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

const createTimeIntervals = (start: Date, end: Date, interval = 30) => {
    const timeArray = [];
    let currTime = start;

    while (currTime <= end) {
        timeArray.push(currTime);
        currTime = addMinutes(currTime, interval);
    }

    return timeArray;
};

export default function TimeSlotPicker({
    date,
    interval,
    timeSlot,
    setTimeSlot,
}: {
    date: Date | undefined;
    interval: number | undefined;
    timeSlot: string | undefined;
    setTimeSlot: React.Dispatch<React.SetStateAction<string | undefined>>;
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
                    setCurrTime(createTimeIntervals(start, end, interval));
                else setCurrTime([]);
            }

            return;
        }
    }, [date, interval, setTimeSlot]);

    return (
        <div className="flex flex-wrap justify-between gap-1 align-top">
            {currTime &&
                currTime.map((el) => {
                    const hour = el.getHours();
                    const minutes = `${el.getMinutes() || "00"}`;
                    const time =
                        hour >= 13
                            ? `${hour - 12}:${minutes} pm`
                            : `${hour}:${minutes} am`;

                    return (
                        <div
                            onClick={() => {
                                setTimeSlot(time);
                            }}
                            className={`cursor-pointer rounded ${
                                timeSlot === time
                                    ? "bg-emerald-400"
                                    : "bg-white"
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
