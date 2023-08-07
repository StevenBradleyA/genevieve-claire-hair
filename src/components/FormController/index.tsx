import { useState } from "react";
import ServiceOptions from "../NewClientForm/ServiceOptions";
import ColorHistory from "../NewClientForm/ColorHistory";
import ChemHair from "../NewClientForm/ChemHair";
import CurrentColor from "../NewClientForm/CurrentColor";
import TimeSlots from "../NewClientForm/TimeSlots";
import ExtraDetails from "../NewClientForm/ExtraDetails";

const NewClient = [
    <ServiceOptions key={0} />,
    <ColorHistory key={1} />,
    <ChemHair key={2} />,
    <CurrentColor key={3} />,
    <TimeSlots key={4} />,
    <ExtraDetails key={5} />,
];

export default function FormController() {
    const [page, setPage] = useState(0);

    const form = NewClient;

    const changePages = (num: number) => {
        const newNum = page + num;

        if (newNum < form.length && newNum >= 0) setPage(page + num);
        else newNum < 0 ? setPage(0) : setPage(form.length - 1);
    };

    return (
        <div>
            <div>{form[page]}</div>

            <div className="mt-5 flex items-center justify-center gap-10 font-quattrocento text-2xl text-white">
                <button
                    onClick={() => changePages(-1)}
                    className="transform rounded-md bg-glass px-4 py-2 text-purple-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                >
                    Back
                </button>
                <button
                    onClick={() => changePages(1)}
                    className="transform rounded-md bg-glass px-4 py-2 text-violet-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                >
                    Next
                </button>
            </div>
            {/* Submit using local storage check */}
        </div>
    );
}
