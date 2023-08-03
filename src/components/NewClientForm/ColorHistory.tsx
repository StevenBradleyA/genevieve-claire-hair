import { useState } from "react";

const defaultState = {
    yes: false,
    no: false,
    ago: "",
    prof: false,
    home: false,
};

type InputNames = "yes" | "no" | "prof" | "home";

export default function ColorHistory() {
    const [formData, setFormData] = useState(defaultState);

    const setAgo = (input: string) => {
        const newData = { ...formData };

        newData.ago = input;

        setFormData(newData);
    };

    const toggle = (input: InputNames) => {
        const newData = { ...formData };
        newData[input] = !newData[input];

        if (newData.no === newData.yes && newData.no !== false) {
            input === "yes" ? (newData.no = false) : (newData.yes = false);
        }

        setFormData(newData);
    };

    return (
        <form>
            <div>
                Have you had color before?
                <div>
                    <label>
                        Yes
                        <input
                            type="checkbox"
                            name="yes"
                            checked={formData.yes}
                            onChange={() => toggle("yes")}
                        ></input>
                    </label>
                    <label>
                        No
                        <input
                            type="checkbox"
                            name="no"
                            checked={formData.no}
                            onChange={() => toggle("no")}
                        ></input>
                    </label>
                </div>
                {formData.yes && (
                    <div>
                        <label>
                            How long ago?
                            <input
                                name="ago"
                                value={formData.ago}
                                onChange={() => setAgo("ago")}
                            ></input>
                        </label>
                        <label>
                            Professionally
                            <input
                                type="checkbox"
                                name="prof"
                                checked={formData.prof}
                                onChange={() => toggle("prof")}
                            ></input>
                        </label>
                        <label>
                            At home
                            <input
                                type="checkbox"
                                name="home"
                                checked={formData.home}
                                onChange={() => toggle("home")}
                            ></input>
                        </label>
                    </div>
                )}
            </div>
        </form>
    );
}
