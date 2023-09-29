import { useEffect, useState } from "react";
import { useMobile } from "../MobileContext";

const defaultState = {
    yes: false,
    no: false,
    ago: "",
    prof: false,
    home: false,
};

type InputNames = "yes" | "no" | "prof" | "home";

interface FirstTimeClientProps {
    setNotes: (notes: string) => void;
}

export default function ColorHistory({ setNotes }: FirstTimeClientProps) {
    const [formData, setFormData] = useState(defaultState);
    const { isMobile } = useMobile();

    useEffect(() => {
        let newNotes = "Has had color before: ";

        if (formData.yes) {
            newNotes += "yes";

            if (formData.ago) {
                newNotes += `, ${formData.ago} ago`;

                if (formData.prof) {
                    newNotes += ", professionally";
                }
                if (formData.home) {
                    newNotes += ", at home";
                }
            }
        } else if (formData.no) {
            newNotes += "no";
        }

        setNotes(newNotes);
    }, [formData, setNotes]);

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
    return isMobile ? (
        <form className="flex flex-col items-center text-xl text-white">
            <div className="flex justify-center text-lg">
                Have you had color before?
            </div>
            <div>
                <div className=" mt-5 flex flex-col justify-center gap-3">
                    <label className="flex cursor-pointer items-center justify-center gap-5">
                        Yes
                        <input
                            type="checkbox"
                            name="yes"
                            checked={formData.yes}
                            onChange={() => toggle("yes")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                    <label className="flex cursor-pointer items-center justify-center gap-5">
                        No
                        <input
                            type="checkbox"
                            name="no"
                            checked={formData.no}
                            onChange={() => toggle("no")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                </div>
            </div>
            {formData.yes && (
                <div className="mt-3 flex flex-col gap-3">
                    <label className="flex justify-center">How long ago?</label>
                    <input
                        name="ago"
                        type="input"
                        value={formData.ago}
                        onChange={(e) => setAgo(e.target.value)}
                        className="rounded-md p-2 text-sm text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    ></input>
                    <label className="flex cursor-pointer items-center justify-center gap-5">
                        Professionally
                        <input
                            type="checkbox"
                            name="prof"
                            checked={formData.prof}
                            onChange={() => toggle("prof")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                    <label className="flex cursor-pointer items-center justify-center gap-5">
                        At home
                        <input
                            type="checkbox"
                            name="home"
                            checked={formData.home}
                            onChange={() => toggle("home")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                </div>
            )}
        </form>
    ) : (
        <form className="flex flex-col items-center text-3xl text-white">
            <div className="flex justify-center text-4xl">
                Have you had color before?
            </div>
            <div>
                <div className=" mb-5 mt-5 flex justify-center gap-10">
                    <label className="flex cursor-pointer items-center justify-center gap-5">
                        Yes
                        <input
                            type="checkbox"
                            name="yes"
                            checked={formData.yes}
                            onChange={() => toggle("yes")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                    <label className="flex cursor-pointer items-center justify-center gap-5">
                        No
                        <input
                            type="checkbox"
                            name="no"
                            checked={formData.no}
                            onChange={() => toggle("no")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                </div>
            </div>
            {formData.yes && (
                <div className="flex gap-5">
                    <label>How long ago?</label>
                    <input
                        name="ago"
                        type="input"
                        value={formData.ago}
                        onChange={(e) => setAgo(e.target.value)}
                        className=" rounded-md p-2 text-xl text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    ></input>
                    <label className="flex cursor-pointer items-center justify-center gap-5">
                        Professionally
                        <input
                            type="checkbox"
                            name="prof"
                            checked={formData.prof}
                            onChange={() => toggle("prof")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                    <label className="flex cursor-pointer items-center justify-center gap-5">
                        At home
                        <input
                            type="checkbox"
                            name="home"
                            checked={formData.home}
                            onChange={() => toggle("home")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                </div>
            )}
        </form>
    );
}
