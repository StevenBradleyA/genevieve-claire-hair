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

    const { mutate } = api.user.updateNewUser.useMutation({
        onSuccess: async () => {
            try {
                toast.success("First time client form complete!", {
                    icon: "👏",
                    style: {
                        borderRadius: "10px",
                        background: "#ffffff",
                        color: "#d8b4fe",
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

    return (
        <>
            <form className="flex w-full flex-col  items-center rounded-3xl bg-white p-5 text-xl text-white shadow-xl laptop:p-10 laptop:text-4xl">
                <label className=" flex justify-center bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text  text-transparent">
                    Please provide your full name
                </label>
                <div className=" mt-3 flex w-full justify-center gap-5 laptop:w-2/3">
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className=" w-1/2 rounded-md bg-purple-200 p-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200 laptop:text-xl"
                        placeholder="First Name"
                    />
                    <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className=" w-1/2 rounded-md bg-purple-200 p-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200 laptop:text-xl"
                        placeholder="Last Name"
                    />
                </div>
                {enableErrors && errors.firstName && (
                    <p className="mt-1 text-sm text-red-300 laptop:text-base">
                        {errors.firstName}
                    </p>
                )}
                {enableErrors && errors.lastName && (
                    <p className="text-sm text-red-300 laptop:text-base">
                        {errors.lastName}
                    </p>
                )}
                <label className="mt-5 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-center text-transparent">
                    Provide your phone number
                </label>
                <div className=" bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-center text-sm text-transparent laptop:text-base">
                    ( Optional if you want text reminders when booking )
                </div>

                <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className=" mt-3 w-2/3 rounded-md bg-purple-200 p-3 text-sm  focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200 laptop:w-1/3 laptop:text-xl"
                    placeholder="(999) 999-9999"
                ></input>
                {enableErrors && errors.phoneNumber && (
                    <p className="text-xl text-red-400">{errors.phoneNumber}</p>
                )}

                <label className="mt-5 flex justify-center bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                    {`Anything you'd like me to know?`}
                </label>
                <div className=" bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-center text-sm text-transparent laptop:text-base">
                    ( Optional )
                </div>
                <textarea
                    value={formData}
                    onChange={(e) => setFormData(e.target.value)}
                    className=" mt-3 h-40 w-full resize-none rounded-md bg-purple-200 p-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200 laptop:w-1/3 laptop:text-xl"
                    placeholder="Any specific hair concerns or needs?"
                />

                <label className="mt-5 flex justify-center bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                    Upload photos of your hair
                </label>
                <div className="mb-3 bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-center text-sm text-transparent laptop:text-base">
                    ( Optional and will only be seen by me )
                </div>
                <div className="py-2 hover:opacity-70">
                    <label className="relative inline-block h-20 w-32">
                        <input
                            className="absolute h-full w-full cursor-pointer opacity-0"
                            type="file"
                            multiple
                            accept="image/png, image/jpg, image/jpeg, image/heif, image/heic"
                            onChange={(e) => {
                                if (e.target.files)
                                    setImageFiles([
                                        ...imageFiles,
                                        ...e.target.files,
                                    ]);
                            }}
                        />
                        <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-3xl bg-purple-200 text-white shadow-lg transition-all duration-300 ">
                            <span className="text-center ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M12.5535 2.49392C12.4114 2.33852 12.2106 2.25 12 2.25C11.7894 2.25 11.5886 2.33852 11.4465 2.49392L7.44648 6.86892C7.16698 7.17462 7.18822 7.64902 7.49392 7.92852C7.79963 8.20802 8.27402 8.18678 8.55352 7.88108L11.25 4.9318V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V4.9318L15.4465 7.88108C15.726 8.18678 16.2004 8.20802 16.5061 7.92852C16.8118 7.64902 16.833 7.17462 16.5535 6.86892L12.5535 2.49392Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z"
                                        fill="currentColor"
                                    />
                                </svg>
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
                    className={`transform rounded-md bg-purple-200 px-4 py-2 text-lg shadow-md transition-transform hover:scale-105 active:scale-95 ${
                        isSubmitting ? "text-slate-300" : ""
                    } ${hasSubmitted ? "text-slate-300" : ""} ${
                        Object.values(errors).length
                            ? "text-white/50"
                            : "text-white"
                    }`}
                >
                    {isSubmitting ? "Uploading..." : "Complete"}
                </button>
            </form>
        </>
    );
}
