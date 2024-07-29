import { useEffect, useState } from "react";
import { useMobile } from "../MobileContext";

type ServiceOptionsType = { [key: string]: boolean };

const defaultState: ServiceOptionsType = {
    haircuts: false,
    color: false,
    vivid: false,
    highlightsBalayage: false,
    tonorGloss: false,
};

interface FirstTimeClientProps {
    setNotes: (notes: string) => void;
    setReady: (ready: boolean) => void;
}

export default function ServiceOptions({
    setNotes,
    setReady,
}: FirstTimeClientProps) {
    const [formData, setFormData] = useState(defaultState);
    const { isMobile } = useMobile();

    useEffect(() => {
        const services = localStorage.getItem("ServiceOptions");

        if (services) {
            const savedSelections = JSON.parse(services) as ServiceOptionsType;

            setFormData(savedSelections);
        }
    }, []);

    useEffect(() => {
        const selectedOptions = Object.keys(formData).filter(
            (key) => formData[key]
        );

        if (selectedOptions.length) {
            const updatedNotes = `Interested in the following services: ${selectedOptions.join(
                ", "
            )}`;
            setNotes(updatedNotes);
            setReady(true);
        } else {
            setNotes("");
            setReady(false);
        }
    }, [formData, setNotes, setReady]);

    const toggle = (input: string) => {
        const newData = { ...formData };

        newData[input] = !newData[input];

        localStorage.setItem("ServiceOptions", JSON.stringify(newData));

        setFormData(newData);
    };

    return (
        <form className="flex w-full flex-col items-center rounded-3xl bg-white p-5 text-base text-violet-300 laptop:p-10 laptop:text-2xl">
            <h1 className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-center text-xl text-transparent laptop:text-3xl">
                Which services do you see yourself using?
            </h1>
            <h2 className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                ( Select all that you might want )
            </h2>

            <div className="mt-5 flex w-full flex-wrap justify-between gap-2 laptop:mt-10">
                <label className="flex cursor-pointer items-center justify-center gap-2">
                    Haircuts
                    <input
                        type="checkbox"
                        name="haircuts"
                        checked={formData.haircuts}
                        onChange={(e) => toggle(e.target.name)}
                        className="custom-checkbox"
                    />
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-2">
                    Color
                    <input
                        type="checkbox"
                        name="color"
                        checked={formData.color}
                        onChange={(e) => toggle(e.target.name)}
                        className="custom-checkbox"
                    />
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-2">
                    Vivid
                    <input
                        type="checkbox"
                        name="vivid"
                        checked={formData.vivid}
                        onChange={(e) => toggle(e.target.name)}
                        className="custom-checkbox"
                    />
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-2">
                    Highlights/Balayage
                    <input
                        type="checkbox"
                        name="highlightsBalayage"
                        checked={formData.highlightsBalayage}
                        onChange={(e) => toggle(e.target.name)}
                        className="custom-checkbox"
                    />
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-2">
                    Toner/Gloss
                    <input
                        type="checkbox"
                        name="tonorGloss"
                        checked={formData.tonorGloss}
                        onChange={(e) => toggle(e.target.name)}
                        className="custom-checkbox"
                    />
                </label>
            </div>
        </form>
    );
}
