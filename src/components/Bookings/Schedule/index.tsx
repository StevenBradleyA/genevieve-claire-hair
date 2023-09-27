import { useState } from "react";
import { api } from "~/utils/api";
import type { Schedule } from "@prisma/client";

interface ScheduleProps {
    schedule: Schedule;
    closeModal: () => void;
}

export default function EachSchedule({ schedule, closeModal }: ScheduleProps) {
    const [startTime, setStartTime] = useState(schedule.startTime);
    const [endTime, setEndTime] = useState(schedule.endTime);

    const ctx = api.useContext();

    const { mutate } = api.schedule.updateSchedule.useMutation({
        onSuccess: () => {
            void ctx.schedule.getNormalizedDays.invalidate();
            void ctx.schedule.getAllDays.invalidate();
            closeModal();
        },
    });

    const handleScheduleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            id: schedule.id,
            dayOfWeek: schedule.dayOfWeek,
            startTime,
            endTime,
        };

        mutate(data);
    };

    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
        <form className="mb-5 flex items-center justify-between gap-5 rounded-2xl bg-darkGlass px-6 py-2">
            <div className="">
                {
                    [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                    ][schedule.dayOfWeek]
                }
            </div>
            <select
                value={startTime}
                onChange={(e) => setStartTime(parseInt(e.target.value, 10))}
                className="mr-3 rounded-2xl bg-darkGlass p-2"
            >
                {hours.map((hour) => (
                    <option key={hour} value={hour}>
                        {hour}:00
                    </option>
                ))}
            </select>
            <select
                value={endTime}
                onChange={(e) => setEndTime(parseInt(e.target.value, 10))}
                className="mr-3 rounded-2xl bg-darkGlass p-2"
            >
                {hours.map((hour) => (
                    <option key={hour} value={hour}>
                        {hour}:00
                    </option>
                ))}
            </select>
            <button
                className="rounded-2xl bg-darkGlass px-4 py-2"
                onClick={handleScheduleUpdate}
            >
                Update
            </button>
        </form>
    );
}
