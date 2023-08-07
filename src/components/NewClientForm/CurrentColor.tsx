import { useState } from "react";

const defaultState = {
    blackBrown: false,
    brown: false,
    brownBlonde: false,
    blonde: false,
    white: false,
    other: false,
    input: "",
};

type InputNames =
    | "blackBrown"
    | "brown"
    | "brownBlonde"
    | "blonde"
    | "white"
    | "other";

export default function CurrentColor() {
    const [formData, setFormData] = useState(defaultState);

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

    return (
        <form className="flex flex-col items-center  font-quattrocento text-3xl text-white">
            <div className="mb-5 flex justify-center text-4xl">
                What is your current hair color?
            </div>
            <div className="flex flex-col text-3xl">
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
                        name="brownBlonde"
                        checked={formData.brownBlonde}
                        onChange={() => singleToggle("brownBlonde")}
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
                        checked={formData.white}
                        onChange={() => singleToggle("white")}
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
