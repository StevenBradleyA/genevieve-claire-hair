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
    const [ready, setReady] = useState(true);
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

    const changePages = (num: number) => {
        const newNum = page + num;

        if (newNum < form.length && newNum >= 0) {
            setPage(newNum);
        } else newNum < 0 ? setPage(0) : setPage(form.length - 1);
    };

    const form = [
        <ServiceOptions
            key={0}
            setReady={setReady}
            setNotes={setServiceNotes}
        />,
        <ColorHistory
            key={1}
            setReady={setReady}
            setNotes={setColorHistoryNotes}
        />,
        <ChemHair key={2} setReady={setReady} setNotes={setChemNotes} />,
        <CurrentColor
            key={3}
            setReady={setReady}
            setNotes={setCurrentColorNotes}
        />,
        <TimeSlots key={4} setReady={setReady} setNotes={setTimeNotes} />,
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
        <>
            <h1 className="font-archivo text-white text-4xl laptop:text-8xl">
                First Time Client
            </h1>
            <div className="flex  w-full justify-center ">
                <div className="mt-5 laptop:mt-10 w-full laptop:w-2/3 desktop:w-1/2">
                    <div className="flex w-full flex-col items-center px-2 laptop:px-10">
                        {form[page]}
                    </div>

                    <div className="full:text-2xl mb-20 mt-10 flex items-center justify-center  gap-10 text-white mobile:text-sm sm:text-lg">
                        <button
                            onClick={() => changePages(-1)}
                            className="transform rounded-full bg-glass  p-2 text-purple-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 rotate-180"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M6 12H18M18 12L13 7M18 12L13 17"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>

                        {page === form.length - 1 ? null : (
                            <button
                                onClick={() => changePages(1)}
                                className="transform rounded-full bg-glass p-2 text-violet-300 shadow-md transition-transform hover:opacity-70"
                                disabled={!ready}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M6 12H18M18 12L13 7M18 12L13 17"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    ) : null;
}
