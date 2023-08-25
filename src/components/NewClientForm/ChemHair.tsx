import { useEffect, useState } from "react";

const defaultState = {
    yes: false,
    no: false,
    keratin: false,
    waves: false,
    relaxers: false,
};

type InputNames = "yes" | "no" | "keratin" | "waves" | "relaxers";

interface FirstTimeClientProps {
    setNotes: (notes: string) => void;
}

export default function ChemHair({setNotes}: FirstTimeClientProps) {
    const [formData, setFormData] = useState(defaultState);


    useEffect(() => {
        const selectedOptions = Object.keys(formData).filter(
            (key) => formData[key]
        );
        const updatedNotes = `Has had chemical treatments done to hair: \n ${selectedOptions.join(
            ", "
        )}`;
        setNotes(updatedNotes);
    }, [formData, setNotes]);


    const toggle = (input: InputNames) => {
        const newData = { ...formData };
        newData[input] = !newData[input];

        if (newData.no === newData.yes && newData.no !== false) {
            input === "yes" ? (newData.no = false) : (newData.yes = false);
        }

        setFormData(newData);
    };

    return (
        <form className="flex flex-col items-center justify-center font-quattrocento text-3xl text-white">
            <div className="text-4xl">Have you had any chemical treatments done on your hair?</div>

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
                </label>
            </div>
            {formData.yes && (
                <div className=" mb-5 mt-5 flex justify-center gap-10">
                    <label className="flex cursor-pointer items-center justify-center gap-5">
                        Keratin Treatment
                        <input
                            type="checkbox"
                            name="keratin"
                            checked={formData.keratin}
                            onChange={() => toggle("keratin")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                    <label className="flex cursor-pointer items-center justify-center gap-5">
                        Permanent waves
                        <input
                            type="checkbox"
                            name="waves"
                            checked={formData.waves}
                            onChange={() => toggle("waves")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                    <label className="flex cursor-pointer items-center justify-center gap-5">
                        Relaxers
                        <input
                            type="checkbox"
                            name="relaxers"
                            checked={formData.relaxers}
                            onChange={() => toggle("relaxers")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                </div>
            )}
        </form>
    );
}
