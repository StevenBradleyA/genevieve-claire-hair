import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import type { Review } from "@prisma/client";
import type { Session } from "next-auth";
import { uploadFileToS3 } from "~/pages/api/aws/utils";
import Image from "next/image";
import { DotLoader } from "react-spinners";
import { useMobile } from "~/components/MobileContext";
import toast from "react-hot-toast";

interface UpdateProps {
    review: Review;
    session: Session;
    closeModal: () => void;
}
interface ErrorsObj {
    image?: string;
    imageExcess?: string;
    imageLarge?: string;
}

interface StarProps {
    rating: number;
    starRating: number;
    hover: number;
    starHover: (rating: number) => void;
    onClick: (rating: number) => void;
}

interface Image {
    link: string;
}

interface ReviewData {
    id: string;
    text: string;
    starRating: number;
    userId: string;
    bookingId: string;
    deleteImageIds: string[];
    images?: Image[];
}

const Star = ({ rating, starRating, hover, starHover, onClick }: StarProps) => {
    const filled = "cursor-pointer holo-gradient-text";
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

export default function UpdateReview({
    review,
    session,
    closeModal,
}: UpdateProps) {
    const [text, setText] = useState(review.text);
    const [starRating, setStarRating] = useState(review.starRating);
    const [hover, setHover] = useState(0);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [activeDeletedImageIds, setActiveDeletedImageIds] = useState<
        string[]
    >([]);
    const { isMobile } = useMobile();
    const ctx = api.useContext();

    const { data: images, isLoading } = api.image.getAllByResourceId.useQuery({
        resourceType: "REVIEW",
        resourceId: review.id,
    });

    useEffect(() => {
        const maxFileSize = 6 * 1024 * 1024;
        const errorsObj: ErrorsObj = {};

        const totalImageCount =
            (imageFiles.length ?? 0) +
            (images?.length ?? 0) -
            (activeDeletedImageIds.length ?? 0);
        if (totalImageCount > 3) {
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
    }, [imageFiles, activeDeletedImageIds, images]);

    const { mutate } = api.review.update.useMutation({
        onSuccess: () => {
            closeModal();
            void ctx.review.getAll.invalidate();
            void ctx.image.getAllByResourceId.invalidate();
            toast.success("Review Updated!", {
                style: {
                    borderRadius: "10px",
                    background: "#ffffff",
                    color: "#d8b4fe",
                },
            });
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
                    id: review.id,
                    text,
                    starRating,
                    userId: sessionUserId,
                    bookingId: review.bookingId,
                    deleteImageIds: activeDeletedImageIds,
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
    if (isLoading)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Images are loading</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
            </div>
        );

    return (
        <div
            className={`flex h-[500px] ${
                isMobile ? "w-[250px]" : "w-[450px]"
            } flex-col items-center`}
        >
            <div className=" flex flex-col items-center text-3xl text-white laptop:text-5xl">
                <h1 className="font-grandHotel">Edit Review</h1>
                <div className="rounded-full bg-white p-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-purple-300 "
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M12 3L14.0357 8.16153C14.2236 8.63799 14.3175 8.87622 14.4614 9.0771C14.5889 9.25516 14.7448 9.41106 14.9229 9.53859C15.1238 9.68245 15.362 9.77641 15.8385 9.96432L21 12L15.8385 14.0357C15.362 14.2236 15.1238 14.3175 14.9229 14.4614C14.7448 14.5889 14.5889 14.7448 14.4614 14.9229C14.3175 15.1238 14.2236 15.362 14.0357 15.8385L12 21L9.96432 15.8385C9.77641 15.362 9.68245 15.1238 9.53859 14.9229C9.41106 14.7448 9.25516 14.5889 9.0771 14.4614C8.87622 14.3175 8.63799 14.2236 8.16153 14.0357L3 12L8.16153 9.96432C8.63799 9.77641 8.87622 9.68245 9.0771 9.53859C9.25516 9.41106 9.41106 9.25516 9.53859 9.0771C9.68245 8.87622 9.77641 8.63799 9.96432 8.16153L12 3Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            <form
                className="mt-3 flex  w-full flex-col items-center gap-5 overflow-y-auto rounded-3xl bg-white p-5 text-sm text-purple-300 laptop:text-xl"
                encType="multipart/form-data"
            >
                <textarea
                    value={text}
                    placeholder="What did you think of my work?"
                    onChange={(e) => setText(e.target.value)}
                    className=" h-40 w-full flex-shrink-0 resize-none rounded-md bg-purple-200 p-2 text-white placeholder:text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-violet-200"
                />

                <div className="flex w-full items-center justify-between text-white">
                    {isMobile === false && (
                        <span className=" bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text  text-transparent">
                            Star Rating
                        </span>
                    )}
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
                <div className="flex flex-col items-center justify-center text-lg laptop:text-2xl">
                    <h2 className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-transparent">
                        Show Off Your Hair!
                    </h2>
                    <h3 className="text-xs laptop:text-base">(optional)</h3>
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
                    {images &&
                        images.length > 0 &&
                        images.map((image, i) =>
                            !activeDeletedImageIds.includes(image.id) ? (
                                <div key={i} className="relative">
                                    <Image
                                        className="h-28 w-auto rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md"
                                        alt={`listing-${i}`}
                                        src={image.link}
                                        width={100}
                                        height={100}
                                    />
                                    <button
                                        className="absolute right-[-10px] top-[-32px] transform p-1 text-2xl text-gray-600 transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const newDeletedImageIds = [
                                                ...activeDeletedImageIds,
                                                image.id,
                                            ];
                                            setActiveDeletedImageIds(
                                                newDeletedImageIds
                                            );
                                        }}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ) : null
                        )}
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
                            (hasSubmitted ||
                                Object.values(errors).length > 0)) ||
                        (!isSubmitting && (!starRating || !text))
                    }
                    className={`flex transform items-center gap-2 rounded-md bg-purple-200 px-4 py-2 shadow-md transition-transform hover:scale-105 active:scale-95 ${
                        (hasSubmitted && Object.values(errors).length > 0) ||
                        isSubmitting ||
                        (imageFiles.length > 0 &&
                            (hasSubmitted ||
                                Object.values(errors).length > 0)) ||
                        (!isSubmitting && (!starRating || !text))
                            ? "text-white/50"
                            : "text-white"
                    }`}
                >
                    Update
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg border-2 border-white">
                        {(hasSubmitted && Object.values(errors).length > 0) ||
                            isSubmitting ||
                            (imageFiles.length > 0 &&
                                (hasSubmitted ||
                                    Object.values(errors).length > 0)) ||
                            (!isSubmitting && (!starRating || !text) ? null : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <g>
                                        <path
                                            d="M6 12L10.2426 16.2426L18.727 7.75732"
                                            stroke="currentColor"
                                            stroke-width="3"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </g>
                                </svg>
                            ))}
                    </div>
                </button>
            </form>
        </div>
    );
}
