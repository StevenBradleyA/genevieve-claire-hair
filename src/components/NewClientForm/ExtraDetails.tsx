import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Image from "next/image";
import { uploadFileToS3 } from "~/pages/api/aws/utils";
import { useRouter } from "next/router";

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
    firstName?: string;
    lastName?: string;
}

interface Image {
    link: string;
}
interface UserData {
    userId: string;
    firstName: string;
    lastName: string;
    notes: string;
    images?: Image[];
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
    const { data: session, update } = useSession();
    const ctx = api.useContext();
    const router = useRouter();
    const [formData, setFormData] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { mutate } = api.user.updateNewUser.useMutation({
        onSuccess: async () => {
            try {
                void ctx.user.getAllUsers.invalidate();
                void ctx.user.invalidate();
                await update();
                await router.push("/");
            } catch (error) {
                console.error("Error while navigating:", error);
            }
        },
    });

    const handleInputErrors = () => {
        const errorsObj: ErrorsObj = {};
        // ! should implement max file size upload could cap at like 50mb
        if (!firstName.length) {
            errorsObj.firstName = "Please provide your first name";
        }
        if (!lastName.length) {
            errorsObj.lastName = "Please provide your last name";
        }

        if (imageFiles.length > 5) {
            errorsObj.imageExcess = "Cannot provide more than 5 photos";
        }
        setErrors(errorsObj);
    };

    useEffect(() => {
        handleInputErrors();
    }, [imageFiles, firstName, lastName]);

    useEffect(() => {
        const updatedNotes = `Anything you'd like me to know? \n ${formData}`;
        setExtraNotes(updatedNotes);
    }, [formData, setExtraNotes]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!Object.values(errors).length && !isSubmitting) {
            try {
                const sessionUserId = session?.user?.id;

                if (!sessionUserId) {
                    throw new Error("Session expired");
                }

                const notes = `${serviceNotes} poggywoggy ${colorHistoryNotes} poggywoggy ${chemNotes} poggywoggy ${currentColorNotes} poggywoggy ${timeNotes} poggywoggy ${extraNotes}`;

                const data: UserData = {
                    userId: sessionUserId,
                    firstName,
                    lastName,
                    notes,
                };

                setIsSubmitting(true);

                if (imageFiles.length > 0) {
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

                mutate(data);
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
            {errors.firstName && (
                <p className="create-listing-errors text-red-500">
                    {errors.firstName}
                </p>
            )}
            {errors.lastName && (
                <p className="create-listing-errors text-red-500">
                    {errors.lastName}
                </p>
            )}

            <div className="mb-5 flex justify-center text-4xl">
                {`Anything you'd like me to know?`}
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
            <div className="py-4">
                <label className="relative inline-block h-40 w-40">
                    <input
                        className="absolute h-full w-full cursor-pointer opacity-0"
                        type="file"
                        multiple
                        // accept="image/png, image/jpg, image/jpeg"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files)
                                setImageFiles([
                                    ...imageFiles,
                                    ...e.target.files,
                                ]);
                        }}
                    />
                    <div className="flex h-full w-full cursor-pointer items-center justify-center rounded bg-glass text-white shadow-lg transition-all duration-300 hover:shadow-xl">
                        <span className="text-center font-quattrocento">
                            Choose Files
                        </span>
                    </div>
                </label>
            </div>
            <div className="mb-5 flex w-3/4 flex-wrap justify-center gap-10">
                {imageFiles.map((e, i) => (
                    <div key={i} className="relative">
                        <Image
                            className="h-28 w-auto rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md"
                            alt={`listing-${i}`}
                            src={URL.createObjectURL(e)}
                            width={100}
                            height={100}
                        />
                        <button
                            className="absolute right-[-10px] top-[-32px] transform p-1 text-2xl text-gray-600 transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                            onClick={(e) => {
                                e.preventDefault();
                                const newImageFiles = [...imageFiles];
                                newImageFiles.splice(i, 1);
                                setImageFiles(newImageFiles);
                            }}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            {errors.imageExcess && (
                <p className="create-listing-errors text-red-500">
                    {errors.imageExcess}
                </p>
            )}

            <button
                onClick={(e) => {
                    e.preventDefault();
                    void submit(e);
                }}
                disabled={
                    (hasSubmitted && Object.values(errors).length > 0) ||
                    isSubmitting ||
                    (imageFiles.length > 0 &&
                        (hasSubmitted || Object.values(errors).length > 0)) ||
                    (!isSubmitting && (!firstName || !lastName))
                }
                className={`transform rounded-md bg-glass px-4 py-2 shadow-md transition-transform hover:scale-105 active:scale-95 ${
                    (hasSubmitted && Object.values(errors).length > 0) ||
                    isSubmitting ||
                    (imageFiles.length > 0 &&
                        (hasSubmitted || Object.values(errors).length > 0)) ||
                    (!isSubmitting && (!firstName || !lastName))
                        ? "text-slate-300"
                        : "text-purple-300"
                }`}
            >
                {isSubmitting ? "Uploading..." : "Submit Review"}
            </button>
        </form>
    );
}
