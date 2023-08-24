import { useState } from "react";
import { motion } from "framer-motion";

const defaultState: { [name: string]: boolean } = {
    haircuts: false,
    color: false,
    vivid: false,
    hb: false,
    tg: false,
};

interface FirstTimeClientProps {
    notes: string;
    // setNotes: React.Dispatch<React.SetStateAction<string>>;
    setNotes: (notes: string) => void;
    changePages: (num: number) => void;
    currentPage: number;
}

export default function ServiceOptions({
    notes,
    setNotes,
    changePages,
    currentPage,
}: FirstTimeClientProps) {
    const [formData, setFormData] = useState(defaultState);

    const toggle = (input: string) => {
        const newData = { ...formData };

        newData[input] = !newData[input];

        setFormData(newData);
    };

    return (
        <form className="flex flex-col items-center justify-center font-quattrocento text-3xl text-white">
            <div className="flex items-center gap-5">
                <div className="text-4xl">
                    Which services do you see yourself using?{" "}
                </div>
                <div className="text-2xl">(Select all that you might want)</div>
            </div>
            <div className="mt-5 flex gap-10">
                <label className="flex cursor-pointer items-center justify-center gap-5">
                    Haircuts
                    <input
                        type="checkbox"
                        name="haircuts"
                        checked={formData.haircuts}
                        onChange={(e) => toggle(e.target.name)}
                        className="custom-checkbox"
                    />
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-5">
                    Color
                    <input
                        type="checkbox"
                        name="color"
                        checked={formData.color}
                        onChange={(e) => toggle(e.target.name)}
                        className="custom-checkbox"
                    />
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-5">
                    Vivid
                    <input
                        type="checkbox"
                        name="vivid"
                        checked={formData.vivid}
                        onChange={(e) => toggle(e.target.name)}
                        className="custom-checkbox"
                    />
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-5">
                    Highlights/Balayage
                    <input
                        type="checkbox"
                        name="hb"
                        checked={formData.hb}
                        onChange={(e) => toggle(e.target.name)}
                        className="custom-checkbox"
                    />
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-5">
                    Toner/Gloss
                    <input
                        type="checkbox"
                        name="tg"
                        checked={formData.tg}
                        onChange={(e) => toggle(e.target.name)}
                        className="custom-checkbox"
                    />
                </label>
            </div>
        </form>
    );
}
