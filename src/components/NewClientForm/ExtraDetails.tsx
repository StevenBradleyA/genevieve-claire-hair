import { useEffect, useState } from "react";
import CreateImage from "../Images/Create";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

interface FirstTimeClientProps {
    extraNotes: string;
    setExtraNotes: (notes: string) => void;
    serviceNotes: string;
    colorHistoryNotes: string;
    chemNotes: string;
    currentColorNotes: string;
    timeNotes: string;
}

interface ErrorsObj {
    image?: string;
    imageExcess?: string;
}

interface Image {
    link: string;
}

export default function ExtraDetails({
    extraNotes,
    setExtraNotes,
    serviceNotes,
    colorHistoryNotes,
    chemNotes,
    currentColorNotes,
    timeNotes,
}: FirstTimeClientProps) {
    const { data: session } = useSession();
    const ctx = api.useContext();
    const [formData, setFormData] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    //    TODO need to add notes to user , first name, last name

    const { mutate } = api.review.create.useMutation({
        onSuccess: () => {
            // void ctx.review.getAll.invalidate();
        },
    });

    const handleInputErrors = () => {
        const errorsObj: ErrorsObj = {};
        // ! should implement max file size upload could cap at like 50mb
        if (imageFiles.length > 5) {
            errorsObj.imageExcess = "Cannot provide more than 5 photos";
        }
        setErrors(errorsObj);
    };

    useEffect(() => {
        handleInputErrors();
    }, [imageFiles]);

    //TODO  have submit here
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!Object.values(errors).length && !isSubmitting) {
            try {
                const sessionUserId = session?.user?.id;

                if (!sessionUserId) {
                    throw new Error("Session expired");
                }

                const data: ReviewData = {
                    text,
                    starRating,
                    userId: sessionUserId,
                    bookingId: bookingId,
                };

                setIsSubmitting(true);

                if (imageFiles.length > 0) {
                    console.log("hello, we have more than one image");
                    const imagePromises = imageFiles.map((file) => {
                        return new Promise<string>((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onloadend = () => {
                                if (typeof reader.result === "string") {
                                    const base64Data =
                                        reader.result.split(",")[1];
                                    if (base64Data) {
                                        resolve(base64Data);
                                    }
                                } else {
                                    reject(new Error("Failed to read file"));
                                }
                            };
                            reader.onerror = () => {
                                reject(new Error("Failed to read file"));
                            };
                        });
                    });

                    const base64DataArray = await Promise.all(imagePromises);
                    const imageUrlArr: string[] = [];

                    for (const base64Data of base64DataArray) {
                        const buffer = Buffer.from(base64Data, "base64");
                        const imageUrl = await uploadFileToS3(buffer);
                        imageUrlArr.push(imageUrl);
                    }

                    data.images = imageUrlArr.map((imageUrl) => ({
                        link: imageUrl || "",
                    }));
                }
                // setText("");

                // mutate(data);

                setImageFiles([]);
                setHasSubmitted(true);
                setIsSubmitting(false);
            } catch (error) {
                console.error("Submission failed:", error);
                setIsSubmitting(false);
            }
        }
    };

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

            <button className="transform rounded-md bg-glass px-4 py-2 text-violet-300 shadow-md transition-transform hover:scale-105 active:scale-95">
                Submit
            </button>
        </form>
    );
}
