import { useState } from "react";
import CreateImage from "../Images/Create";

export default function ExtraDetails() {
    const [formData, setFormData] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [hasSubmittedImages, setHasSubmittedImages] =
        useState<boolean>(false);

    console.log(formData);

    //TODO  have submit here

    return (
        <form className="flex flex-col items-center  rounded-2xl bg-glass p-20 font-quattrocento text-3xl text-white shadow-xl">
            <div className="mb-5 flex justify-center text-4xl">
                Please provide your full name
            </div>
            <div className=" mb-10 flex gap-5">
                <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className=" rounded-md p-3 text-xl text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    placeholder="First Name"
                ></input>
                <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className=" rounded-md p-3 text-xl text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    placeholder="Last Name"
                ></input>
            </div>

            <div className="mb-5 flex justify-center text-4xl">
                Anything you'd like me to know?
            </div>
            <textarea
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
                className=" h-40 w-80 rounded-md p-3 text-xl text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
            ></textarea>

            <div className="mt-5 flex justify-center text-4xl">
                Upload photos of your hair
            </div>
            <div className=" flex justify-center text-xl">
                (this will only be seen by me )
            </div>
            {!hasSubmittedImages ? (
                <CreateImage
                    setHasSubmittedImages={setHasSubmittedImages}
                    resourceType={"USER"}
                />
            ) : (
                <div>thank you!</div>
            )}

            <button

                className="transform rounded-md bg-glass px-4 py-2 text-violet-300 shadow-md transition-transform hover:scale-105 active:scale-95"
            >
                Submit
            </button>
        </form>
    );
}
