import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { uploadFileToS3 } from "~/pages/api/aws/utils";

interface ErrorsObj {
    image?: string;
    imageExcess?: string;
}
interface CreateImageProps {
    setHasSubmittedImages: React.Dispatch<React.SetStateAction<boolean>>,
    resourceType: string,
    resourceId: string,
}

export default function CreateImage({
    setHasSubmittedImages,
    resourceType
}: CreateImageProps) {
    const { data: session } = useSession();
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const ctx = api.useContext();

    const handleInputErrors = () => {
        const errorsObj: ErrorsObj = {};
        // ! should implement max file size upload could cap at like 50mb
        if (imageFiles.length < 1) {
            errorsObj.image = "Provide at least 1 Photo";
        }
        if (imageFiles.length > 10) {
            errorsObj.imageExcess = "Cannot provide more than 10 photos";
        }
        setErrors(errorsObj);
    };

    useEffect(() => {
        handleInputErrors();
    }, [imageFiles]);

    const { mutate } = api.image.create.useMutation({
        onSuccess: () => {
            void ctx.image.getAllByUserId.invalidate();
        },
    });

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!Object.values(errors).length && !isSubmitting) {
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

                const payload = {
                    images: imageUrlArr.map((imageUrl) => ({
                        link: imageUrl || "",
                        resourceType: resourceType,
                        resourceId: session?.user.id ?? "",
                        userId: session?.user.id ?? "",
                    })),
                };

                mutate(payload);
                setImageFiles([]);
                setHasSubmitted(true);
                setIsSubmitting(false);
                setHasSubmittedImages(true);
            } catch (error) {
                console.error("Upload failed:", error);
                setIsSubmitting(false);
            }
        }
    };

    return (
        <form
            encType="multipart/form-data"
            className="flex flex-col items-center justify-center font-quattrocento"
        >
            {hasSubmitted && errors.image && (
                <p className="create-listing-errors">{errors.image}</p>
            )}
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
                            <img
                                className="h-28 w-auto rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md"
                                alt={`listing-${i}`}
                                src={URL.createObjectURL(e)}
                                key={i}
                            />
                        </>
                    );
                })}
            </div>

            <button
                className="] rounded-lg bg-glass px-4 py-2 font-quattrocento text-white shadow-md hover:bg-purple-300"
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    void handleFormSubmit(e);
                }}
                disabled={
                    (hasSubmitted && Object.values(errors).length > 0) ||
                    isSubmitting
                }
            >
                {isSubmitting ? "Uploading..." : "Upload Photos"}
            </button>
        </form>
    );
}
