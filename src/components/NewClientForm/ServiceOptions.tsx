import { useState } from "react";
import { motion } from "framer-motion";

const defaultState: { [name: string]: boolean } = {
    haircuts: false,
    color: false,
    vivid: false,
    hb: false,
    tg: false,
};

export default function ServiceOptions() {
    const [formData, setFormData] = useState(defaultState);

    const toggle = (input: string) => {
        const newData = { ...formData };

        newData[input] = !newData[input];

        setFormData(newData);
    };

    return (
        <form>
            <div className="font-quattrocento text-3xl text-white ">
                Which services do you see yourself using?
                <label>(Select all that you might want)</label>
                <div className="flex gap-10">
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
            </div>
        </form>
    );
}
