import { eachHourOfInterval, endOfDay } from "date-fns";
import { useState } from "react";

export default function TimeSlotPicker({ timeSlot, setTimeSlot }) {
    const timeInterval = 60;
    const [currTime, setCurrTime] = useState(
        eachHourOfInterval({ start: new Date(), end: endOfDay(new Date()) })
    );

    return (
        <div className="flex flex-wrap justify-between gap-1 align-top">
            {currTime.map((el, i) => {
                const hour = el.getHours();
                const time = hour >= 13 ? `${hour - 12} pm` : `${hour} am`;

                return (
                    <div
                        onClick={() => setTimeSlot(hour)}
                        className="rounded bg-white p-1 shadow-2xl"
                        key={i}
                    >
                        {time}
                    </div>
                );
            })}
        </div>
    );
}
