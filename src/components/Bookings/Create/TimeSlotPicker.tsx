import { eachHourOfInterval, endOfDay } from "date-fns";
import { useEffect, useState } from "react";

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
        if (date)
            setCurrTime(
                eachHourOfInterval({ start: date, end: endOfDay(date) })
            );
        else setCurrTime([]);
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
