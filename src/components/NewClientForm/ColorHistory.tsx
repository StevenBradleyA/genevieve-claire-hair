import { useEffect, useState } from "react";
import { useMobile } from "../MobileContext";

type InputNames = "yes" | "no" | "prof" | "home";

type ColorHistoryType = { [key in InputNames]: boolean } & { ago: string };

const defaultState: ColorHistoryType = {
    yes: false,
    no: false,
    ago: "",
    prof: false,
    home: false,
};

interface FirstTimeClientProps {
    setNotes: (notes: string) => void;
    setReady: (ready: boolean) => void;
}

export default function ColorHistory({
    setNotes,
    setReady,
}: FirstTimeClientProps) {
    const [formData, setFormData] = useState(defaultState);
    const { isMobile } = useMobile();

    useEffect(() => {
        const history = localStorage.getItem("ColorHistory");

        if (history) {
            const savedSelections = JSON.parse(history) as ColorHistoryType;

            setFormData(savedSelections);
        }
    }, []);

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

    useEffect(() => {
        const { yes, no, ago, prof, home } = formData;

        if (no) return setReady(true);
        if (yes && ago && (prof || home)) return setReady(true);

        return setReady(false);
    }, [formData, setReady]);

    const setAgo = (input: string) => {
        const newData = { ...formData };

        newData.ago = input;

        localStorage.setItem("ColorHistory", JSON.stringify(newData));

        setFormData(newData);
    };

    const toggle = (input: InputNames) => {
        const newData = { ...formData };
        newData[input] = !newData[input];

        if (newData.no === newData.yes && newData.no !== false) {
            input === "yes" ? (newData.no = false) : (newData.yes = false);
        }

        localStorage.setItem("ColorHistory", JSON.stringify(newData));

        setFormData(newData);
    };

    return (
        <form className="flex w-full flex-col items-center rounded-3xl bg-white p-10 text-base text-violet-300 laptop:text-xl">
            <h1 className="flex justify-center bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-center text-2xl text-transparent laptop:text-3xl">
                Have you had color before?
            </h1>
            <div>
                <div className=" mb-5 mt-5 flex justify-center gap-10">
                    <label className="flex cursor-pointer items-center justify-center gap-2">
                        Yes
                        <input
                            type="checkbox"
                            name="yes"
                            checked={formData.yes}
                            onChange={() => toggle("yes")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                    <label className="flex cursor-pointer items-center justify-center gap-2">
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
                <div className="flex w-full flex-wrap items-center justify-between gap-5 ">
                    <label className="flex items-center gap-2">
                        How long ago?
                        <input
                            name="ago"
                            type="input"
                            value={formData.ago}
                            onChange={(e) => setAgo(e.target.value)}
                            className=" w-1/2 rounded-md bg-purple-200  p-2 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                            placeholder="6 months..."
                        />
                    </label>
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
