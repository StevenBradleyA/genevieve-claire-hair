import { useEffect, useState } from "react";
import type { FormInputType } from "./Services";

type SelectionsType = Exclude<FormInputType, "Vivids" | "Color Corrections">;

type ServiceOptionType = { [key in SelectionsType]: string[] };

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
};

const Specifications = () => {
    const [selections, setSelections] = useState<SelectionsType[]>();

    useEffect(() => {
        const storage = localStorage.getItem("Services");
        if (storage) {
            const choicesObj = JSON.parse(storage) as ServiceOptionType;
            const choicesArr = Object.keys(choicesObj) as SelectionsType[];

            setSelections(choicesArr.filter((el) => choicesObj[el]));
        }
    }, []);

    if (selections) {
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
