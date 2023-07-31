import { eachHourOfInterval, endOfDay } from "date-fns";
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

export default function TimeSlotPicker({
    date,
    timeSlot,
    setTimeSlot,
}: {
    date: Date | undefined;
    timeSlot: number | undefined;
    setTimeSlot: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
    // const timeInterval = 60;
    const [currTime, setCurrTime] = useState(
        eachHourOfInterval({ start: new Date(), end: endOfDay(new Date()) })
    );

    useEffect(() => {
        if (date) {
            const [startTime, endTime] = schedule[date.getDay()] as number[];

            if (startTime && endTime) {
                const start = new Date(date.getTime());
                const end = new Date(date.getTime());
                start.setHours(startTime);
                end.setHours(endTime);

                console.log(start, end);
                setCurrTime(eachHourOfInterval({ start, end }));
            }
        } else setCurrTime([]);
    }, [date]);

    return (
        <div className="flex flex-wrap justify-between gap-1 align-top">
            {currTime.map((el) => {
                const hour = el.getHours();
                const time = hour >= 13 ? `${hour - 12} pm` : `${hour} am`;

                return (
                    <div
                        onClick={() => {
                            setTimeSlot(hour);
                        }}
                        className={`cursor-pointer rounded ${
                            timeSlot === hour ? "bg-emerald-400" : "bg-white"
                        } p-1 shadow-2xl `}
                        key={hour}
                    >
                        {time}
                    </div>
                );
            })}
        </div>
    );
}
