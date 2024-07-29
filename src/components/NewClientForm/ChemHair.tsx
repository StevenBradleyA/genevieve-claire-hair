import { useEffect, useState } from "react";
import { useMobile } from "../MobileContext";

type InputNames = "yes" | "no" | "keratin" | "waves" | "relaxers";

type ChemHairType = { [key in InputNames]: boolean };

const defaultState: ChemHairType = {
    yes: false,
    no: false,
    keratin: false,
    waves: false,
    relaxers: false,
};

interface FirstTimeClientProps {
    setNotes: (notes: string) => void;
    setReady: (ready: boolean) => void;
}

export default function ChemHair({ setNotes, setReady }: FirstTimeClientProps) {
    const [formData, setFormData] = useState(defaultState);
    const { isMobile } = useMobile();

    useEffect(() => {
        const chemicals = localStorage.getItem("ChemHair");

        if (chemicals) {
            const savedSelections = JSON.parse(chemicals) as ChemHairType;

            setFormData(savedSelections);
        }
    }, []);

    useEffect(() => {
        const selectedOptions = Object.keys(formData).filter(
            (key) => formData[key as keyof typeof formData]
        );

        const updatedNotes = `Has had chemical treatments done to hair: ${selectedOptions.join(
            ", "
        )}`;

        setNotes(updatedNotes);
    }, [formData, setNotes]);

    useEffect(() => {
        const { yes, no, keratin, waves, relaxers } = formData;

        if (no) return setReady(true);
        if (yes && (keratin || waves || relaxers)) return setReady(true);

        return setReady(false);
    }, [formData, setReady]);

    const toggle = (input: InputNames) => {
        const newData = { ...formData };
        newData[input] = !newData[input];

        if (newData.no === newData.yes && newData.no !== false) {
            input === "yes" ? (newData.no = false) : (newData.yes = false);
        }

        localStorage.setItem("ChemHair", JSON.stringify(newData));

        setFormData(newData);
    };

    return (
        <form className="flex w-full flex-col items-center  justify-center rounded-3xl bg-white p-10 text-base text-violet-300 laptop:text-xl">
            <h1 className="flex justify-center bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-center text-2xl text-transparent laptop:text-3xl">
                Have you had any chemical treatments done on your hair?
            </h1>

            <div className=" mb-5 mt-5 flex flex-wrap justify-between gap-5">
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
                <div className=" my-5 flex  flex-wrap justify-between gap-5">
                    <label className="flex cursor-pointer items-center justify-center gap-2">
                        Keratin Treatment
                        <input
                            type="checkbox"
                            name="keratin"
                            checked={formData.keratin}
                            onChange={() => toggle("keratin")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                    <label className="flex cursor-pointer items-center justify-center gap-2">
                        Permanent waves
                        <input
                            type="checkbox"
                            name="waves"
                            checked={formData.waves}
                            onChange={() => toggle("waves")}
                            className="custom-checkbox"
                        ></input>
                    </label>
                    <label className="flex cursor-pointer items-center justify-center gap-2">
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
