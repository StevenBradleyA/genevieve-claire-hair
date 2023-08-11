import { useState, useEffect } from "react";
import type { FormControlProps } from "../FormController";
import type { FormDataType } from "./Services";

export default function ConsultMessage({
    page,
    changePages,
}: FormControlProps) {
    const [requireConsult, setRequireConsult] = useState<string | null>("");

    useEffect(() => {
        const storage = localStorage.getItem("Services");
        if (storage) {
            const choicesObj = JSON.parse(storage) as FormDataType;

            if (choicesObj["Vivids"]) {
                setRequireConsult("Vivids");
            } else if (choicesObj["Color Corrections"]) {
                setRequireConsult("Color Corrections");
            } else setRequireConsult(null);
        }
    }, []);

    useEffect(() => {
        if (requireConsult === null) {
            changePages(page + 1);
        }
    }, [requireConsult, page, changePages]);

    return <div>Please contact me to discuss your appointment</div>;
}
