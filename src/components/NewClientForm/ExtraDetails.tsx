import { useState } from "react";
import CreateImage from "../Images/Create";

export default function ExtraDetails() {
    const [formData, setFormData] = useState("");
    const [hasSubmittedImages, setHasSubmittedImages] =
        useState<boolean>(false);

    return (
        <form className="flex flex-col items-center  font-quattrocento text-3xl text-white">
            <div className="mb-5 flex justify-center text-4xl">
                Anything you'd like me to know?
            </div>
            <input
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
                className=" rounded-md p-3 text-xl text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
            ></input>
            <div className="mt-5 flex justify-center text-4xl">
                Upload photos of your hair
            </div>
            <div className=" flex justify-center text-xl">
                (this will only be seen by me )
            </div>
            {!hasSubmittedImages ? (
                <CreateImage setHasSubmittedImages={setHasSubmittedImages} />
            ) : (
                <div>thank you!</div>
            )}
        </form>
    );
}
