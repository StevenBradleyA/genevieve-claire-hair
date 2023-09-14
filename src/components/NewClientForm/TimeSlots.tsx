import { useEffect, useState } from "react";
import { useMobile } from "../MobileContext";

const defaultState = {
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
}

type InputNames = "mon" | "tues" | "wed" | "thur" | "fri" | "sat" | "sun";

export default function TimeSlots({ setNotes }: FirstTimeClientProps) {
    const [formData, setFormData] = useState(defaultState);
    const { isMobile } = useMobile();

    useEffect(() => {
        const selectedDays = Object.keys(formData).filter(
            (key) => formData[key as keyof typeof formData] && key !== "time"
        );

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
    }, [formData, setNotes]);

    const setTime = (input: string) => {
        const newData = { ...formData };

        newData.time = input;

        setFormData(newData);
    };

    const toggle = (input: InputNames) => {
        const newData = { ...formData };

        newData[input] = !newData[input];

        setFormData(newData);
    };

    return isMobile ? (
        <form className="flex flex-col font-quattrocento text-xl text-white">
            <div className="mb-5 w-72 text-center text-lg">
                What days/times are you most likely to book?
            </div>
            <div className="flex w-72 flex-col items-start text-xl">
                <label className="mb-2 flex cursor-pointer items-center gap-5">
                    Time
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={(e) => setTime(e.target.value)}
                        className="block rounded-md bg-glass px-4 py-2 text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-300"
                    ></input>
                </label>
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
            </div>
        </form>
    ) : (
        <form className="flex flex-col font-quattrocento text-3xl text-white">
            <div className="mb-5 flex justify-center text-4xl">
                What days/times are you most likely to book?
            </div>
            <div className="flex flex-col items-start text-3xl">
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
                        className="block rounded-md bg-glass px-4 py-2 text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-300"
                    ></input>
                </label>
            </div>
        </form>
    );
}
