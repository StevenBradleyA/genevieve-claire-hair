import { useState } from "react";
import { motion } from "framer-motion";
import type { DateRange } from "react-day-picker";
import { api } from "~/utils/api";

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
};

export default function SetHours({
    dateRange,
    setDateRange,
}: {
    dateRange: DateRange | undefined;
    setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}) {
    const [allDay, setAllDay] = useState(true);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const ctx = api.useContext();

    const onSuccess = () => {
        setStartTime("");
        setEndTime("");
        setDateRange(undefined);
        void ctx.schedule.getTimeOff.invalidate();
    };

    const { mutate: fullTimeOff } = api.schedule.createFullTimeOff.useMutation({
        onSuccess,
    });

    const { mutate: specificTimeOff } =
        api.schedule.createSpecificTimeOff.useMutation({
            onSuccess,
        });

    const disableSubmit = () => {
        if (!dateRange) return true;
        if (!allDay && (!startTime || !endTime)) return true;
        return false;
    };

    const submit = () => {
        if (!dateRange || !dateRange.from)
            throw new Error("Hot Toast Incoming!!!");

        if (allDay)
            fullTimeOff({ startDate: dateRange.from, endDate: dateRange.to });
        else
            specificTimeOff({
                startDate: dateRange.from,
                endDate: dateRange.to,
                startTime,
                endTime,
            });
    };

    return (
        <div className="flex h-full flex-col items-center gap-4 text-2xl">
            <div className="mt-3 flex items-center gap-5 font-bold">
                <div>All Day</div>

                <div
                    className={`${
                        allDay ? "justify-start" : "justify-end"
                    } flex w-16 cursor-pointer rounded-full bg-slate-100 bg-opacity-40 p-2`}
                    onClick={() => setAllDay(!allDay)}
                >
                    <motion.div
                        className="h-6 w-6 rounded-full bg-white"
                        layout
                        transition={spring}
                    />
                </div>
                <div>Specific Time</div>
            </div>
            <div
                className={`flex h-full flex-col items-center justify-evenly ${
                    allDay ? "text-slate-200" : ""
                }`}
            >
                <span>
                    From{" "}
                    <input
                        className="bg-transparent outline-none"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        disabled={allDay}
                    />
                </span>
                <span>
                    To{" "}
                    <input
                        className="bg-transparent outline-none"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        disabled={allDay}
                    />
                </span>
            </div>
            <motion.button
                onClick={submit}
                className={`mb-3 rounded-md bg-glass px-12 py-2 shadow-md ${
                    disableSubmit() ? "text-slate-200" : "text-violet-300"
                }`}
                disabled={disableSubmit()}
                whileHover={
                    disableSubmit()
                        ? { cursor: "default" }
                        : { scale: 1.1, cursor: "pointer" }
                }
                whileTap={disableSubmit() ? {} : { scale: 0.95 }}
            >
                Submit
            </motion.button>
        </div>
    );
}
