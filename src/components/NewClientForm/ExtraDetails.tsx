import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Image from "next/image";
import { uploadFileToS3 } from "~/pages/api/aws/utils";
import { useRouter } from "next/router";
import { useMobile } from "../MobileContext";
import toast from "react-hot-toast";

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
    imageLarge?: string;
    phoneNumber?: string;
}

interface Image {
    link: string;
}
interface UserData {
    userId: string;
    firstName: string;
    lastName: string;
    notes: string;
    phoneNumber: string;
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
    const { isMobile } = useMobile();
    const ctx = api.useContext();
    const router = useRouter();
    const [formData, setFormData] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [enableErrors, setEnableErrors] = useState<boolean>(false);

    // TODO Hot toast for submission saying ftc form completed!

    const { mutate } = api.user.updateNewUser.useMutation({
        onSuccess: async () => {
            try {
                toast.success("First time client form complete!", {
                    icon: "👏",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                void ctx.user.getAllUsers.invalidate();
                void ctx.user.invalidate();
                await update();
                await router.push("/");
            } catch (error) {
                console.error("Error while navigating:", error);
            }
        },
    });

    useEffect(() => {
        const maxFileSize = 6 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};

        if (!firstName.length) {
            errorsObj.firstName = "Please provide your first name";
        }
        if (!lastName.length) {
            errorsObj.lastName = "Please provide your last name";
        }
        if (phoneNumber.length > 0) {
            if (!/^\d+$/.test(phoneNumber) || phoneNumber.length !== 10) {
                errorsObj.phoneNumber =
                    "Phone number must be exactly 10 digits and contain only numbers";
            }
        }

        if (imageFiles.length > 5) {
            errorsObj.imageExcess = "Cannot provide more than 5 photos";
        }

        for (const file of imageFiles) {
            if (file.size > maxFileSize) {
                errorsObj.imageLarge =
                    "One or more images exceeds the max 6 MB file size";
                break;
            }
        }

        setErrors(errorsObj);
    }, [imageFiles, firstName, lastName, phoneNumber]);

    useEffect(() => {
        const updatedNotes = `Anything you'd like me to know? \n ${formData}`;
        setExtraNotes(updatedNotes);
    }, [formData, setExtraNotes]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEnableErrors(true);
        if (!Object.values(errors).length && !isSubmitting) {
            try {
                const sessionUserId = session?.user?.id;

                if (!sessionUserId) {
                    throw new Error("Session expired");
                }

                const notes = `${serviceNotes} \n ${colorHistoryNotes} \n ${chemNotes} \n ${currentColorNotes} \n ${timeNotes} \n ${extraNotes}`;
                const data: UserData = {
                    userId: sessionUserId,
                    firstName,
                    lastName,
                    notes,
                    phoneNumber,
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

    return isMobile ? (
        <form className="flex w-72 flex-col  items-center rounded-2xl bg-glass p-5 text-xl text-white shadow-xl">
            <div className="mb-5 text-center text-lg">
                Please provide your full name
            </div>
            <div className=" mb-5 flex flex-col gap-5 text-xs">
                <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className=" rounded-md p-3 text-xs text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    placeholder="First Name"
                ></input>
                <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className=" rounded-md p-3 text-xs text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                    placeholder="Last Name"
                ></input>
            </div>
            {enableErrors && errors.firstName && (
                <p className="create-listing-errors text-xs text-red-500">
                    {errors.firstName}
                </p>
            )}
            {enableErrors && errors.lastName && (
                <p className="create-listing-errors text-xs text-red-500">
                    {errors.lastName}
                </p>
            )}
            <div className="text-center text-lg">Provide your phone number</div>
            <div className="mb-5 text-center text-sm">
                (Optional if you want text reminders)
            </div>

            <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className=" rounded-md p-3 text-xs text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="(999) 999-9999"
            ></input>
            {errors.phoneNumber && (
                <p className="text-xs text-red-400">{errors.phoneNumber}</p>
            )}

            <div className="my-5 text-center text-lg">
                {`Anything you'd like me to know?`}
            </div>
            <textarea
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
                className=" h-16 w-48 rounded-md p-3 text-xl text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
            ></textarea>

            <div className="mt-5 text-center text-lg">
                Upload photos of your hair
            </div>
            <div className=" text-center text-xs">
                (this will only be seen by Geni )
            </div>
            <div className="py-4">
                <label className="relative inline-block h-16 w-16">
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
                        <span className="text-center  text-xs">
                            Choose Files
                        </span>
                    </div>
                </label>
            </div>
            <div className="mb-5 flex w-3/4 flex-wrap justify-center gap-3">
                {imageFiles.map((e, i) => (
                    <div key={i} className="relative">
                        <Image
                            className="mb-3 h-12 w-auto rounded-lg object-cover shadow-sm"
                            alt={`listing-${i}`}
                            src={URL.createObjectURL(e)}
                            width={100}
                            height={100}
                        />
                        <button
                            className="absolute right-[-10px] top-[-32px] transform p-1 text-2xl text-gray-600 "
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
                <p className="create-listing-errors text-xs text-red-500">
                    {errors.imageExcess}
                </p>
            )}
            {errors.imageLarge && (
                <p className="create-listing-errors text-xs text-red-500">
                    {errors.imageLarge}
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
                className={`transform rounded-md bg-glass px-4 py-2 text-xs shadow-md transition-transform hover:scale-105 active:scale-95 ${
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
    ) : (
        <form className="flex flex-col items-center  rounded-2xl bg-glass p-20 text-3xl text-white shadow-xl">
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
            {enableErrors && errors.firstName && (
                <p className="text-xl text-red-400">{errors.firstName}</p>
            )}
            {enableErrors && errors.lastName && (
                <p className="text-xl text-red-400">{errors.lastName}</p>
            )}
            <div className="text-center text-4xl">
                Provide your phone number
            </div>
            <div className="mb-5 text-center text-xl">
                (Optional if you want text reminders)
            </div>

            <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className=" rounded-md p-3 text-xl text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="(999) 999-9999"
            ></input>
            {enableErrors && errors.phoneNumber && (
                <p className="text-xl text-red-400">{errors.phoneNumber}</p>
            )}

            <div className="my-5 flex justify-center text-4xl">
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
                        <span className="text-center">Choose Files</span>
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
            {errors.imageLarge && (
                <p className="create-listing-errors text-red-500">
                    {errors.imageLarge}
                </p>
            )}

            <button
                onClick={(e) => {
                    e.preventDefault();
                    void submit(e);
                }}
                disabled={isSubmitting || hasSubmitted}
                className={`transform rounded-md bg-glass px-4 py-2 shadow-md transition-transform hover:scale-105 active:scale-95 ${isSubmitting? "text-slate-300": ""} ${hasSubmitted? "text-slate-300": ""} ${Object.values(errors).length? "text-slate-300": "text-purple-300"}`}
            >
                {isSubmitting ? "Uploading..." : "Submit"}
            </button>
        </form>
    );
}
