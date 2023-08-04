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
        <form>
            <div>
                What is your current hair color?
                <label>
                    Black/Dark Brown
                    <input
                        type="checkbox"
                        name="blackBrown"
                        checked={formData.blackBrown}
                        onChange={() => singleToggle("blackBrown")}
                    ></input>
                </label>
                <label>
                    Brown
                    <input
                        type="checkbox"
                        name="brown"
                        checked={formData.brown}
                        onChange={() => singleToggle("brown")}
                    ></input>
                </label>
                <label>
                    Light Brown/Dark Blonde
                    <input
                        type="checkbox"
                        name="brownBlonde"
                        checked={formData.brownBlonde}
                        onChange={() => singleToggle("brownBlonde")}
                    ></input>
                </label>
                <label>
                    Blonde
                    <input
                        type="checkbox"
                        name="blonde"
                        checked={formData.blonde}
                        onChange={() => singleToggle("blonde")}
                    ></input>
                </label>
                <label>
                    Gray/White
                    <input
                        type="checkbox"
                        name="white"
                        checked={formData.white}
                        onChange={() => singleToggle("white")}
                    ></input>
                </label>
                <label>
                    Other (Please Specify)
                    <input
                        type="checkbox"
                        name="other"
                        checked={formData.other}
                        onChange={() => singleToggle("other")}
                    ></input>
                    <input
                        name="input"
                        value={formData.input}
                        onChange={(e) => setInput(e.target.value)}
                    ></input>
                </label>
            </div>
        </form>
    );
}
