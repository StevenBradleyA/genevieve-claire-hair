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

const defaultState: FormDataType = {
    Haircut: false,
    "All Over Color": false,
    Blonding: false,
    Vivids: false,
    "Color Corrections": false,
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
            localStorage.setItem("Services", JSON.stringify(newData));
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
        <div className="flex cursor-pointer justify-center gap-2">
            {Object.keys(defaultState).map((type) => (
                <div
                    className={`rounded-lg p-2 text-white ${
                        formData[type as FormInputType]
                            ? "bg-violet-500"
                            : "bg-violet-300"
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
