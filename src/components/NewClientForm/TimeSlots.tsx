import { useState } from "react";

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

type InputNames = "mon" | "tues" | "wed" | "thur" | "fri" | "sat" | "sun";

export default function TimeSlots() {
    const [formData, setFormData] = useState(defaultState);

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

    return (
        <form>
            <div>
                What days/times are you most likely to book?
                <label>
                    Monday
                    <input
                        type="checkbox"
                        name="mon"
                        checked={formData.mon}
                        onChange={() => toggle("mon")}
                    ></input>
                </label>
                <label>
                    Tuesday
                    <input
                        type="checkbox"
                        name="tues"
                        checked={formData.tues}
                        onChange={() => toggle("tues")}
                    ></input>
                </label>
                <label>
                    Wednesday
                    <input
                        type="checkbox"
                        name="wed"
                        checked={formData.wed}
                        onChange={() => toggle("wed")}
                    ></input>
                </label>
                <label>
                    Thursday
                    <input
                        type="checkbox"
                        name="thur"
                        checked={formData.thur}
                        onChange={() => toggle("thur")}
                    ></input>
                </label>
                <label>
                    Friday
                    <input
                        type="checkbox"
                        name="fri"
                        checked={formData.fri}
                        onChange={() => toggle("fri")}
                    ></input>
                </label>
                <label>
                    Saturday
                    <input
                        type="checkbox"
                        name="sat"
                        checked={formData.sat}
                        onChange={() => toggle("sat")}
                    ></input>
                </label>
                <label>
                    Sunday
                    <input
                        type="checkbox"
                        name="sun"
                        checked={formData.sun}
                        onChange={() => toggle("sun")}
                    ></input>
                </label>
                <label>
                    Time
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={(e) => setTime(e.target.value)}
                    ></input>
                </label>
            </div>
        </form>
    );
}
