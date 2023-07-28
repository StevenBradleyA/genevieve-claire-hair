import { eachHourOfInterval, endOfDay } from "date-fns";
import { useState } from "react";

export default function TimeSlotPicker({
    timeSlot,
    setTimeSlot,
}: {
    timeSlot: number | undefined;
    setTimeSlot: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
    const timeInterval = 60;
    const [currTime, setCurrTime] = useState(
        eachHourOfInterval({ start: new Date(), end: endOfDay(new Date()) })
    );
    const [active, setActive] = useState(0);

    return (
        <div className="flex flex-wrap justify-between gap-1 align-top">
            {currTime.map((el) => {
                const hour = el.getHours();
                const time = hour >= 13 ? `${hour - 12} pm` : `${hour} am`;

                return (
                    <div
                        onClick={() => {
                            setActive(hour);
                            setTimeSlot(hour);
                        }}
                        className={`cursor-pointer rounded ${
                            active === hour ? "bg-emerald-400" : "bg-white"
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
