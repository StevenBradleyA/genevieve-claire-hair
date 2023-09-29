import { useEffect, useState } from "react";
import { useMobile } from "../MobileContext";

const defaultState = {
    blackBrown: false,
    brown: false,
    lightBrownDarkBlonde: false,
    blonde: false,
    grayWhite: false,
    other: false,
    input: "",
};

type InputNames =
    | "blackBrown"
    | "brown"
    | "lightBrownDarkBlonde"
    | "blonde"
    | "grayWhite"
    | "other";

interface FirstTimeClientProps {
    setNotes: (notes: string) => void;
}

export default function CurrentColor({ setNotes }: FirstTimeClientProps) {
    const [formData, setFormData] = useState(defaultState);
    const { isMobile } = useMobile();

    useEffect(() => {
        const selectedOptions = Object.keys(formData).filter(
            (key) => formData[key as keyof typeof formData] && key !== "input"
        );

        if (formData.other && formData.input.trim() !== "") {
            selectedOptions.push(`${formData.input}`);
        }

        const updatedNotes = `Current Hair Color: ${selectedOptions.join(
            ": "
        )}`;
        setNotes(updatedNotes);
    }, [formData, setNotes]);

    const setInput = (input: string) => {
        const newData = { ...formData };

        newData.input = input;

        setFormData(newData);
    };

    const singleToggle = (input: InputNames) => {
        const newData = { ...defaultState };

        newData[input] = true;

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
