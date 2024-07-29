import { useEffect, useState } from "react";
import { useMobile } from "../MobileContext";

type InputNames = "mon" | "tues" | "wed" | "thur" | "fri" | "sat" | "sun";

type TimeSlotType = { [key in InputNames]: boolean } & { time: string };

const defaultState: TimeSlotType = {
    mon: false,
    tues: false,
    wed: false,
    thur: false,
    fri: false,
    sat: false,
    sun: false,
    time: "",
};
interface FirstTimeClientProps {
    setNotes: (notes: string) => void;
    setReady: (ready: boolean) => void;
}

export default function TimeSlots({
    setNotes,
    setReady,
}: FirstTimeClientProps) {
    const [formData, setFormData] = useState(defaultState);
    const { isMobile } = useMobile();

    useEffect(() => {
        const time = localStorage.getItem("TimeSlots");

        if (time) {
            const savedSelections = JSON.parse(time) as TimeSlotType;

            setFormData(savedSelections);
        }
    }, []);

    useEffect(() => {
        const selectedDays = Object.keys(formData).filter(
            (key) => formData[key as InputNames] && key !== "time"
        );

        if (!selectedDays.length || !formData.time) return setReady(false);

        const parsedTime = formData.time
            ? new Date(`1970-01-01T${formData.time}`)
            : null;

        let formattedTime = "";
        if (parsedTime) {
            const hours = parsedTime.getHours();
            const minutes = parsedTime.getMinutes();
            const amPm = hours >= 12 ? "PM" : "AM";
            const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
            formattedTime = `${formattedHours}:${minutes
                .toString()
                .padStart(2, "0")} ${amPm}`;
        }

        const updatedNotes = `Most Likely to Book at: ${selectedDays.join(
            ", "
        )}, ${formattedTime}`;

        setNotes(updatedNotes);
        setReady(true);
    }, [formData, setNotes, setReady]);

    const setTime = (input: string) => {
        const newData = { ...formData };

        newData.time = input;

        localStorage.setItem("TimeSlots", JSON.stringify(newData));

        setFormData(newData);
    };

    const toggle = (input: InputNames) => {
        const newData = { ...formData };

        newData[input] = !newData[input];

        localStorage.setItem("TimeSlots", JSON.stringify(newData));

        setFormData(newData);
    };

    return (
        <form className="flex w-full flex-col items-center rounded-3xl bg-white p-10 text-base text-violet-300 laptop:text-xl">
            <h1 className="flex justify-center bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-center text-2xl text-transparent laptop:text-3xl">
                What days/times are you most likely to book?
            </h1>
            <div className="mt-5 flex w-full flex-col gap-3 laptop:mt-10">
                <label className="flex cursor-pointer items-center gap-5">
                    Monday
                    <input
                        type="checkbox"
                        name="mon"
                        checked={formData.mon}
                        onChange={() => toggle("mon")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Tuesday
                    <input
                        type="checkbox"
                        name="tues"
                        checked={formData.tues}
                        onChange={() => toggle("tues")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Wednesday
                    <input
                        type="checkbox"
                        name="wed"
                        checked={formData.wed}
                        onChange={() => toggle("wed")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Thursday
                    <input
                        type="checkbox"
                        name="thur"
                        checked={formData.thur}
                        onChange={() => toggle("thur")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Friday
                    <input
                        type="checkbox"
                        name="fri"
                        checked={formData.fri}
                        onChange={() => toggle("fri")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Saturday
                    <input
                        type="checkbox"
                        name="sat"
                        checked={formData.sat}
                        onChange={() => toggle("sat")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Sunday
                    <input
                        type="checkbox"
                        name="sun"
                        checked={formData.sun}
                        onChange={() => toggle("sun")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Time
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={(e) => setTime(e.target.value)}
                        className=" w-full rounded-xl bg-purple-200 px-6 py-2 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-300 laptop:w-1/3"
                    />
                </label>
            </div>
        </form>
    );
}
