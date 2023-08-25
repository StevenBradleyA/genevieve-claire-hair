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
    const [notes, setNotes] = useState<string>("");
    console.log(notes)
    const changePages = (num: number) => {
        const newNum = page + num;

        if (newNum < form.length && newNum >= 0) {
            // Update notes before moving to the next page
            form[page].props.setNotes(notes); // Update notes for the current page
            setPage(newNum);
        } else newNum < 0 ? setPage(0) : setPage(form.length - 1);
    };

    const form = [
        <ServiceOptions key={0} notes={notes} setNotes={setNotes} changePages={changePages} currentPage={page} />,
        <ColorHistory key={1} notes={notes} setNotes={setNotes} changePages={changePages} currentPage={page} />,
        <ChemHair key={2} notes={notes} setNotes={setNotes} changePages={changePages} currentPage={page} />,
        <CurrentColor key={3} notes={notes} setNotes={setNotes} changePages={changePages} currentPage={page} />,
        <TimeSlots key={4} notes={notes} setNotes={setNotes} changePages={changePages} currentPage={page} />,
        <ExtraDetails key={5} changePages={changePages} currentPage={page} />,
    ];

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
