import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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
    const [chemNotes, setChemNotes] = useState<string>("");
    const [currentColorNotes, setCurrentColorNotes] = useState<string>("");
    const [timeNotes, setTimeNotes] = useState<string>("");
    const [extraNotes, setExtraNotes] = useState<string>("");
    const { data: session } = useSession();
    const router = useRouter();

    const isNew = session?.user.isNew;

    useEffect(() => {
        async function redirectIfNotNew() {
            if (!isNew) {
                try {
                    await router.push("/");
                } catch (error) {
                    console.error("Error while redirecting:", error);
                }
            }
        }
        void redirectIfNotNew();
    }, [isNew]);

    //  TODO make this form only viewable if bool on user model tru
    //  TODO otherwise redirect
    //  TODO make it pop up if they have signed in but bool is false always

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
            setExtraNotes={setExtraNotes}
            serviceNotes={serviceNotes}
            colorHistoryNotes={colorHistoryNotes}
            chemNotes={chemNotes}
            currentColorNotes={currentColorNotes}
            timeNotes={timeNotes}
        />,
    ];

    return isNew ? (
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
    ) : (
        <div className="mt-20 text-3xl text-white">
            {" "}
            New Client Form Completed 😊
        </div>
    );
}
