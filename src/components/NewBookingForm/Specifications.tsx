import { useEffect, useState } from "react";
import type { FormInputType, FormDataType } from "./Services";

type ServiceOptionType = { [key in FormInputType]: string[] | null };

const serviceOptions: ServiceOptionType = {
    Haircut: ["Buzz", "Short", "Long", "Creative", "Unsure"],
    "All Over Color": [
        "Gloss and toner only",
        "Roots only",
        "Roots to ends",
        "Unsure",
    ],
    Blonding: ["Highlights", "Balayage", "Baby lights", "Bleach and tone"],
    Styling: [
        "Styling",
        "Special Event - Prom, Homecoming, Senior pics, Formal",
        "Bridal/Wedding",
        "Unsure",
    ],
    Quiet: ["Music", "No Music"],
    Vivids: null,
    "Color Corrections": null,
};

const Specifications = () => {
    const [selections, setSelections] = useState<FormInputType[]>();

    useEffect(() => {
        const storage = localStorage.getItem("Services");
        if (storage) {
            const choicesObj = JSON.parse(storage) as FormDataType;
            const choicesArr = Object.keys(choicesObj) as FormInputType[];

            setSelections(choicesArr.filter((el) => choicesObj[el]));
        }
    }, []);

    if (selections) {
        if (selections.includes("Quiet") || selections.includes("Vivids")) {
            return <div>Consult Message</div>;
        }
        return (
            <div>
                {selections.map((service) => {
                    return (
                        <div key={service}>
                            {serviceOptions[service].map((option) => {
                                return <input key={option}></input>;
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }

    return <div></div>;
};

export default Specifications;
