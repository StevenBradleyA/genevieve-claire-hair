import { useEffect, useState } from "react";

const defaultState = {
    yes: false,
    no: false,
    ago: "",
    prof: false,
    home: false,
};

type InputNames = "yes" | "no" | "prof" | "home";
interface FirstTimeClientProps {
    notes: string;
    setNotes: (notes: string) => void;
}

export default function ColorHistory({
    notes,
    setNotes,
}: FirstTimeClientProps) {
    const [formData, setFormData] = useState(defaultState);


    useEffect(() => {
        // Construct notes based on form data
        let newNotes = "has had color before";

        if (formData.yes) {
            newNotes += ", yes";

            if (formData.ago) {
                newNotes += `, ${formData.ago} ago`;

                if (formData.prof) {
                    newNotes += " professionally";
                }
                if (formData.home) {
                    newNotes += " at home";
                }
            }
        } else if (formData.no) {
            newNotes += ", no";
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
    return (
        <form className="flex flex-col items-center  font-quattrocento text-3xl text-white">
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
