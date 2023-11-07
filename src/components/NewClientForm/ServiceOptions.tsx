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

    return isMobile ? (
        <form className="flex flex-col items-center justify-center  text-xl text-white">
            <div className="flex flex-col items-center gap-1">
                <div className="text-sm">
                    Which services do you see yourself using?
                </div>
                <div className="text-sm">(Select all that you might want)</div>
            </div>
            <div className="mt-5 flex flex-col gap-3">
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
                        name="highlightsBalayage"
                        checked={formData.highlightsBalayage}
                        onChange={(e) => toggle(e.target.name)}
                        className="custom-checkbox"
                    />
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-5">
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
    ) : (
        <form className="flex flex-col items-center justify-center text-3xl text-white">
            <div className="flex items-center gap-5">
                <div className="text-4xl">
                    Which services do you see yourself using?
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
                        name="highlightsBalayage"
                        checked={formData.highlightsBalayage}
                        onChange={(e) => toggle(e.target.name)}
                        className="custom-checkbox"
                    />
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-5">
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
