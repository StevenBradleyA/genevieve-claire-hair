import { useState } from "react";
import CreateImage from "../Images/Create";

export default function ExtraDetails() {
    const [formData, setFormData] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [hasSubmittedImages, setHasSubmittedImages] =
        useState<boolean>(false);

        console.log(formData)
    return (
        <form className="flex flex-col items-center  font-quattrocento text-3xl text-white bg-glass p-20 rounded-2xl shadow-xl">
            <div className="mb-5 flex justify-center text-4xl">
                Please provide your full name
            </div>
            <div className=" flex gap-5 mb-10">
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
                className=" rounded-md p-3 w-80 h-40 text-xl text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
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
        </form>
    );
}
