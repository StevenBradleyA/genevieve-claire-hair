import { useEffect, useState } from "react";
import { useMobile } from "../MobileContext";

type InputNames =
    | "blackBrown"
    | "brown"
    | "lightBrownDarkBlonde"
    | "blonde"
    | "grayWhite"
    | "other";

type CurrentColorType = { [key in InputNames]: boolean } & { input: string };

const defaultState: CurrentColorType = {
    blackBrown: false,
    brown: false,
    lightBrownDarkBlonde: false,
    blonde: false,
    grayWhite: false,
    other: false,
    input: "",
};

interface FirstTimeClientProps {
    setNotes: (notes: string) => void;
    setReady: (ready: boolean) => void;
}

export default function CurrentColor({
    setNotes,
    setReady,
}: FirstTimeClientProps) {
    const [formData, setFormData] = useState(defaultState);
    const { isMobile } = useMobile();

    useEffect(() => {
        const history = localStorage.getItem("CurrentColor");

        if (history) {
            const savedSelections = JSON.parse(history) as CurrentColorType;

            setFormData(savedSelections);
        }
    }, []);

    useEffect(() => {
        if (formData.other) {
            if (formData.input.trim() !== "") {
                setNotes(`Current Hair Color: ${formData.input.trim()}`);
                setReady(true);
            } else setReady(false);
        } else {
            const selected = Object.keys(formData).find(
                (key) => key !== "input" && formData[key as InputNames]
            );

            if (selected) {
                setNotes(`Current Hair Color: ${selected}`);
                setReady(true);
            } else {
                setReady(false);
            }
        }
    }, [formData, setNotes, setReady]);

    const setInput = (input: string) => {
        const newData = { ...formData };

        newData.input = input;

        localStorage.setItem("CurrentColor", JSON.stringify(newData));

        setFormData(newData);
    };

    const singleToggle = (input: InputNames) => {
        const newData = { ...defaultState };

        newData[input] = true;

        localStorage.setItem("CurrentColor", JSON.stringify(newData));

        setFormData(newData);
    };

    return isMobile ? (
        <form className="flex flex-col items-center text-xl text-white">
            <div className="mb-5 text-center text-lg">
                What is your current hair color?
            </div>
            <div className="flex w-72 flex-col gap-1 text-xl">
                <label className="flex cursor-pointer items-center gap-5">
                    Black/Dark Brown
                    <input
                        type="checkbox"
                        name="blackBrown"
                        checked={formData.blackBrown}
                        onChange={() => singleToggle("blackBrown")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Brown
                    <input
                        type="checkbox"
                        name="brown"
                        checked={formData.brown}
                        onChange={() => singleToggle("brown")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Light Brown/Dark Blonde
                    <input
                        type="checkbox"
                        name="lightBrownDarkBlonde"
                        checked={formData.lightBrownDarkBlonde}
                        onChange={() => singleToggle("lightBrownDarkBlonde")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Blonde
                    <input
                        type="checkbox"
                        name="blonde"
                        checked={formData.blonde}
                        onChange={() => singleToggle("blonde")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Gray/White
                    <input
                        type="checkbox"
                        name="white"
                        checked={formData.grayWhite}
                        onChange={() => singleToggle("grayWhite")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <div className="flex flex-col">
                    <label className="flex cursor-pointer items-center gap-5">
                        Other (Please Specify)
                        <input
                            type="checkbox"
                            name="other"
                            checked={formData.other}
                            onChange={() => singleToggle("other")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                    <input
                        name="input"
                        value={formData.input}
                        onChange={(e) => setInput(e.target.value)}
                        className=" rounded-md p-2 text-sm text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    ></input>
                </div>
            </div>
        </form>
    ) : (
        <form className="flex flex-col items-center text-3xl text-white">
            <div className="mb-5 flex justify-center text-4xl">
                What is your current hair color?
            </div>
            <div className="flex flex-col text-3xl ">
                <label className="flex cursor-pointer items-center gap-5">
                    Black/Dark Brown
                    <input
                        type="checkbox"
                        name="blackBrown"
                        checked={formData.blackBrown}
                        onChange={() => singleToggle("blackBrown")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Brown
                    <input
                        type="checkbox"
                        name="brown"
                        checked={formData.brown}
                        onChange={() => singleToggle("brown")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Light Brown/Dark Blonde
                    <input
                        type="checkbox"
                        name="lightBrownDarkBlonde"
                        checked={formData.lightBrownDarkBlonde}
                        onChange={() => singleToggle("lightBrownDarkBlonde")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Blonde
                    <input
                        type="checkbox"
                        name="blonde"
                        checked={formData.blonde}
                        onChange={() => singleToggle("blonde")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Gray/White
                    <input
                        type="checkbox"
                        name="white"
                        checked={formData.grayWhite}
                        onChange={() => singleToggle("grayWhite")}
                        className="custom-checkbox"
                    ></input>
                </label>
                <label className="flex cursor-pointer items-center gap-5">
                    Other (Please Specify)
                    <input
                        type="checkbox"
                        name="other"
                        checked={formData.other}
                        onChange={() => singleToggle("other")}
                        className="custom-checkbox"
                    ></input>
                    <input
                        name="input"
                        value={formData.input}
                        onChange={(e) => setInput(e.target.value)}
                        className=" rounded-md p-2 text-xl text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    ></input>
                </label>
            </div>
        </form>
    );
}
