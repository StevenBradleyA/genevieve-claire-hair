import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import React from "react";
import CreateImage from "~/components/Images/Create";
import { uploadFileToS3 } from "~/pages/api/aws/utils";
import Image from "next/image"

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
}

interface CreateImageProps {
    setHasSubmittedImages: React.Dispatch<React.SetStateAction<boolean>>;
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

export default function CreateReview() {
    // TODO feeling tired but how can I access the review Id before it is created? Should the image upload be a second part of the modal? they submit the review then add the images? idk
    // TODO will need to be refactored to where images and review submit at same time so that reviewId can be created first maybe? idk
    // TODO may want separate image component and limit files to 3
    // TODO does the backend API have to return the reviewID then I can access it?

    const [text, setText] = useState("");
    const [starRating, setStarRating] = useState(0);
    const [hover, setHover] = useState(0);
    const { data: session } = useSession();
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [imageReview, setImageReview] = useState<boolean>(false)

    const ctx = api.useContext();

    const handleInputErrors = () => {
        const errorsObj: ErrorsObj = {};
        // ! should implement max file size upload could cap at like 50mb
        if (imageFiles.length > 3) {
            errorsObj.imageExcess = "Cannot provide more than 3 photos";
        }
        setErrors(errorsObj);
    };

    useEffect(() => {
        handleInputErrors();
    }, [imageFiles]);

    const { mutate } = api.review.create.useMutation({
        onSuccess: () => {
            void ctx.review.getAll.invalidate();
            void ctx.review.hasReviewed.invalidate();
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

// lets handle submit plain review with no images and handle submit with images

        if (!Object.values(errors).length && !isSubmitting && imageFiles.length > 0) {
            setIsSubmitting(true);
            const imagePromises = imageFiles.map((file) => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                        if (typeof reader.result === "string") {
                            const base64Data = reader.result.split(",")[1];
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

            try {
                const base64DataArray = await Promise.all(imagePromises);
                const imageUrlArr: string[] = [];

                for (const base64Data of base64DataArray) {
                    const buffer = Buffer.from(base64Data, "base64");
                    const imageUrl = await uploadFileToS3(buffer);
                    imageUrlArr.push(imageUrl);
                }
                // create payload without resourceType and resourceId 
                // we won't send 
                const payload = {
                    images: imageUrlArr.map((imageUrl) => ({
                        link: imageUrl || "",
                    })),
                };

                mutate(payload);
                setImageFiles([]);
                setHasSubmitted(true);
                setIsSubmitting(false);


            } catch (error) {
                console.error("Upload failed:", error);
                setIsSubmitting(false);
            }
        }
    };


        if (session && session.user && session.user.id) {
            const data = {
                text,
                starRating,
                userId: session.user.id,
                images: payload
            };

            setText("");
            setStarRating(0);
            setHover(0);

            console.log(mutate(data));
        } else {
            throw new Error("Session expired");
        }
    };

    return (
        <form
            className="flex flex-col items-center gap-5 text-white"
            onSubmit={submit}
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
                <span className="font-quattrocento text-3xl">Star Rating</span>
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
            {hasSubmitted && errors.imageExcess && (
                <p className="create-listing-errors">{errors.imageExcess}</p>
            )}
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
            <div className="mb-5 flex w-full flex-wrap justify-center gap-10">
                {imageFiles.map((e, i) => {
                    return (
                        <>
                            <Image
                                className="h-28 w-auto rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md"
                                alt={`listing-${i}`}
                                src={URL.createObjectURL(e)}
                                key={i}
                                width={100}
                                height={100}
                            />
                        </>
                    );
                })}
            </div>

            <button
                disabled={(hasSubmitted && Object.values(errors).length > 0) ||
                    isSubmitting && starRating && text ? false : true}
                className={`transform rounded-md bg-glass px-4 py-2 shadow-md transition-transform hover:scale-105 active:scale-95 ${
                    starRating && text ? "text-purple-300" : "text-slate-300"
                }`}
            >
                {isSubmitting ? "Uploading..." : "Submit Review"}
            </button>
        </form>
    );
}
