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

const form = [
    <ServiceOptions key={0} />,
    <ColorHistory key={1} />,
    <ChemHair key={2} />,
    <CurrentColor key={3} />,
    <TimeSlots key={4} />,
    <ExtraDetails key={5} />,
];

export default function FirstTimeClient() {
    const [page, setPage] = useState(0);

    const changePages = (num: number) => {
        const newNum = page + num;

        if (newNum < form.length && newNum >= 0) setPage(page + num);
        else newNum < 0 ? setPage(0) : setPage(form.length - 1);
    };

    const router = useRouter();

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
                    <button
                        onClick={() => changePages(1)}
                        className="transform rounded-md bg-glass px-4 py-2 text-violet-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                    >
                        {page === form.length - 1 ? "Submit" : "Next"}
                    </button>
                </div>
                {/* Submit using local storage check */}
            </div>
        </div>
    );
}
