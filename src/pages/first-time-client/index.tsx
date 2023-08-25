import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import {
    ServiceOptions,
    ColorHistory,
    ChemHair,
    CurrentColor,
    TimeSlots,
    ExtraDetails,
} from "~/components/NewClientForm";

export default function FirstTimeClient() {
    const [page, setPage] = useState<number>(0);
    const [serviceNotes, setServiceNotes] = useState<string>("");
    const [colorHistoryNotes, setColorHistoryNotes] = useState<string>("");
    const [currentColorNotes, setCurrentColorNotes] = useState<string>("");
    const [chemNotes, setChemNotes] = useState<string>("");
    const [timeNotes, setTimeNotes] = useState<string>("");
    const [extraNotes, setExtraNotes] = useState<string>("");

    // need to concatenate all notes at the end with \n and add to the db
    console.log(serviceNotes);
    console.log(colorHistoryNotes);
    // console.log(currentColorNotes)
    // console.log(chemNotes)
    // console.log(timeNotes)
    // console.log(chemNotes)
    // console.log(extraNotes)

    const changePages = (num: number) => {
        const newNum = page + num;

        if (newNum < form.length && newNum >= 0) {
            setPage(newNum);
        } else newNum < 0 ? setPage(0) : setPage(form.length - 1);
    };

    const form = [
        <ServiceOptions key={0} setNotes={setServiceNotes} />,
        <ColorHistory key={1} setNotes={setColorHistoryNotes} />,
        <ChemHair key={2} setNotes={setChemNotes} />,
        <CurrentColor key={3} setNotes={setCurrentColorNotes} />,
        <TimeSlots key={4} setNotes={setTimeNotes} />,
        <ExtraDetails
            key={5}
            extraNotes={extraNotes}
            serviceNotes={serviceNotes}
            colorHistoryNotes={colorHistoryNotes}
            chemNotes={chemNotes}
            currentColorNotes={currentColorNotes}
            timeNotes={timeNotes}
            setExtraNotes={extraNotes}
        />,
    ];

    //! gonna need to pass all other notes to extradetails and concatenate them during submission.
    //     if (newNum < form.length && newNum >= 0) setPage(page + num);
    //     else newNum < 0 ? setPage(0) : setPage(form.length - 1);
    // };

    const router = useRouter();

    // const generateNotes = () => {
    //     const selectedOptions = Object.keys(formData).filter(
    //         (key) => formData[key]
    //     );
    //     return selectedOptions.join(", ");
    // };

    // const handleOptionsChange = () => {
    //     const updatedNotes = generateNotes();
    //     setNotes(updatedNotes);
    // };

    // TODO: On submission of form update user
    const { mutate } = api.user.updateNewUser.useMutation({
        onSuccess: () => router.push("/"),
    });

    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="font-grand-hotel text-8xl text-white">
                First Time Client
            </h1>

            <div>
                <div>{form[page]}</div>

                <div className="mb-20 mt-10 flex items-center justify-center gap-10 font-quattrocento text-2xl text-white">
                    <button
                        onClick={() => changePages(-1)}
                        className="transform rounded-md bg-glass px-4 py-2 text-purple-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                    >
                        Back
                    </button>

                    {page === form.length - 1 ? null : (
                        <button
                            onClick={() => changePages(1)}
                            className="transform rounded-md bg-glass px-4 py-2 text-violet-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
