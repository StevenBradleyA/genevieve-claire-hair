import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import React from "react";
import { uploadFileToS3 } from "~/pages/api/aws/utils";
import Image from "next/image";
import { useMobile } from "~/components/MobileContext";

interface StarProps {
    rating: number;
    starRating: number;
    hover: number;
    starHover: (rating: number) => void;
    onClick: (rating: number) => void;
}

interface ErrorsObj {
    image?: string;
    imageExcess?: string;
    imageLarge?: string;
}

interface Image {
    link: string;
}

interface ReviewData {
    text: string;
    starRating: number;
    userId: string;
    bookingId: string;
    images?: Image[];
}

interface CreateReviewProps {
    closeModal: () => void;
    bookingId: string;
}

const Star = ({ rating, starRating, hover, starHover, onClick }: StarProps) => {
    const filled = "cursor-pointer text-image";
    const empty = "cursor-pointer star-image opacity-50";

    const starClasses = rating <= starRating ? filled : empty;
    const hoverClasses = hover ? (rating <= hover ? filled : empty) : false;

    return (
        <div
            className={`h-6 w-6 ${hoverClasses || starClasses}`}
            onMouseEnter={() => starHover(rating)}
            onMouseLeave={() => starHover(0)}
            onClick={() => onClick(rating)}
        >
            ⭐️
        </div>
    );
};

export default function CreateReview({
    closeModal,
    bookingId,
}: CreateReviewProps) {
    const [text, setText] = useState<string>("");
    const [starRating, setStarRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const ctx = api.useContext();
    const { data: session } = useSession();
    const { isMobile } = useMobile();

    useEffect(() => {
        const maxFileSize = 6 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};
        if (imageFiles.length > 3) {
            errorsObj.imageExcess = "Cannot provide more than 3 photos";
        }

        for (const file of imageFiles) {
            if (file.size > maxFileSize) {
                errorsObj.imageLarge =
                    "One or more images exceeds the max 6 MB file size";
                break;
            }
        }

        setErrors(errorsObj);
    }, [imageFiles]);

    const { mutate } = api.review.create.useMutation({
        onSuccess: () => {
            closeModal();
            void ctx.review.getAll.invalidate();
            void ctx.booking.getAllBookingsWithoutReviewsByUserId.invalidate();
        },
    });

    const starHover = (rating: number) => {
        setHover(rating);
    };

    const starClick = (rating: number) => {
        setStarRating(rating);
    };

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
                setText("");
                setStarRating(0);
                setHover(0);
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
        <form
            className="flex flex-col items-center text-white"
            encType="multipart/form-data"
        >
            <div className="font-grand-hotel text-3xl text-white">
                Leave a Review
            </div>
            <textarea
                value={text}
                placeholder="What did you think of my work?"
                onChange={(e) => setText(e.target.value)}
                className=" h-24 w-44 rounded-md bg-glass p-2 text-xs text-purple-300 placeholder:text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
            <div className="flex items-center text-white ">
                <div className="m-2 flex items-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <Star
                            key={rating}
                            rating={rating}
                            starRating={starRating}
                            hover={hover}
                            starHover={starHover}
                            onClick={starClick}
                        />
                    ))}
                </div>
            </div>
            <div className="flex justify-center font-grand-hotel text-xl">
                Show Off Your Awesome Hair!
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
                    <div className="flex h-full w-full cursor-pointer items-center justify-center rounded bg-glass text-white shadow-lg ">
                        <span className="text-center text-xs">
                            Choose Files
                        </span>
                    </div>
                </label>
            </div>
            <div className="mb-5 flex w-full flex-wrap justify-center gap-3">
                {imageFiles.map((e, i) => (
                    <div key={i} className="relative">
                        <Image
                            className="h-12 w-auto rounded-lg object-cover shadow-sm"
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
                <p className="create-listing-errors text-sm text-red-500">
                    {errors.imageExcess}
                </p>
            )}
            {errors.imageLarge && (
                <p className="create-listing-errors text-sm text-red-500">
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
                    (!isSubmitting && (!starRating || !text))
                }
                className={` transform rounded-md bg-glass px-4 py-2 text-sm shadow-md transition-transform hover:scale-105 active:scale-95 ${
                    (hasSubmitted && Object.values(errors).length > 0) ||
                    isSubmitting ||
                    (imageFiles.length > 0 &&
                        (hasSubmitted || Object.values(errors).length > 0)) ||
                    (!isSubmitting && (!starRating || !text))
                        ? "text-slate-300"
                        : "text-purple-300"
                }`}
            >
                {isSubmitting ? "Uploading..." : "Submit Review"}
            </button>
        </form>
    ) : (
        <form
            className="flex flex-col items-center gap-5 text-white"
            encType="multipart/form-data"
        >
            <div className="font-grand-hotel text-6xl text-white">
                Leave a Review
            </div>
            <textarea
                value={text}
                placeholder="What did you think of my work?"
                onChange={(e) => setText(e.target.value)}
                className=" h-40 w-96 rounded-md bg-glass p-2 text-xl text-purple-300 placeholder:text-purple-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
            <div className="flex items-center text-white ">
                <span className=" text-3xl">Star Rating</span>
                <div className="m-2 flex items-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <Star
                            key={rating}
                            rating={rating}
                            starRating={starRating}
                            hover={hover}
                            starHover={starHover}
                            onClick={starClick}
                        />
                    ))}
                </div>
            </div>
            <div className="flex justify-center font-grand-hotel text-6xl">
                Show Off Your Awesome Hair!
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
                        <span className="text-center ">Choose Files</span>
                    </div>
                </label>
            </div>
            <div className="mb-5 flex w-full flex-wrap justify-center gap-10">
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
                disabled={
                    (hasSubmitted && Object.values(errors).length > 0) ||
                    isSubmitting ||
                    (imageFiles.length > 0 &&
                        (hasSubmitted || Object.values(errors).length > 0)) ||
                    (!isSubmitting && (!starRating || !text))
                }
                className={`transform rounded-md bg-glass px-4 py-2 shadow-md transition-transform hover:scale-105 active:scale-95 ${
                    (hasSubmitted && Object.values(errors).length > 0) ||
                    isSubmitting ||
                    (imageFiles.length > 0 &&
                        (hasSubmitted || Object.values(errors).length > 0)) ||
                    (!isSubmitting && (!starRating || !text))
                        ? "text-slate-300"
                        : "text-purple-300"
                }`}
            >
                {isSubmitting ? "Uploading..." : "Submit Review"}
            </button>
        </form>
    );
}
