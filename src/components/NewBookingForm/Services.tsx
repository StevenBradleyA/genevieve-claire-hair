import { useEffect, useState } from "react";

export type FormInputType =
    | "Haircut"
    | "All Over Color"
    | "Blonding"
    | "Vivids"
    | "Color Corrections"
    | "Styling"
    | "Quiet";

export type FormDataType = { [key in FormInputType]: boolean };

// TODO: Geni orders by price and time
const defaultState: FormDataType = {
    Blonding: false,
    "All Over Color": false,
    Vivids: false,
    "Color Corrections": false,
    Haircut: false,
    Styling: false,
    Quiet: false,
};

const Services = () => {
    const [formData, setFormData] = useState(defaultState);

    useEffect(() => {
        const restoredData = localStorage.getItem("Services");

        if (restoredData) setFormData(JSON.parse(restoredData) as FormDataType);
    }, []);

    const toggle = (type: FormInputType) => {
        const newData = { ...formData };

        if (allowSelection(type)) {
            newData[type] = !newData[type];

            if (Object.values(newData).includes(true)) {
                localStorage.setItem("Services", JSON.stringify(newData));
            } else localStorage.removeItem("Services");

            setFormData(newData);
        } else {
            console.log("Hot Toast Incoming!!!");
        }
    };

    const allowSelection = (type: FormInputType) => {
        if (type === "Vivids" && formData["Color Corrections"]) return false;
        if (type === "Color Corrections" && formData["Vivids"]) return false;
        return true;
    };

    return (
        <div className="flex justify-center gap-2 bg-glass p-20 rounded-2xl shadow-xl">
            {Object.keys(defaultState).map((type) => (
                <div
                    className={`rounded-lg p-2 text-white cursor-pointer hover:scale-105 active:scale-95 ${
                        formData[type as FormInputType]
                            ? "bg-violet-400 shadow-md"
                            : "bg-gradient-to-br from-fuchsia-200 to-blue-200 shadow-md"
                    } 
                    ${
                        allowSelection(type as FormInputType)
                            ? ""
                            : "cursor-not-allowed"
                    }
                    `}
                    key={type}
                    onClick={() => toggle(type as FormInputType)}
                >
                    {type}
                </div>
            ))}
        </div>
    );
};

export default Services;
