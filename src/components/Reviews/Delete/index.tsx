import { api } from "~/utils/api";
import type { Session } from "next-auth";
import type { Images } from "@prisma/client";

interface DeleteProps {
    id: string;
    session: Session;
    showDelete: boolean;
    setShowDelete: (show: boolean) => void;
    images: Images[];
}

export default function DeleteReview({
    id,
    session,
    showDelete,
    setShowDelete,
    images,
}: DeleteProps) {
    const ctx = api.useContext();

    const imageIdsArr: string[] =
        images.length > 0 ? images.map((image: Images) => image.id) : [];

    const { mutate } = api.review.delete.useMutation({
        onSuccess: () => {
            void ctx.review.getAll.invalidate();
            void ctx.review.hasReviewed.invalidate();
        },
    });

    const deleteReview = () => {
        setShowDelete(false);
        if (session.user) {
            const data = {
                id,
                userId: session.user.id,
                imageIds: imageIdsArr,
            };
            return mutate(data);
        } else {
            throw new Error("Hot Toast Incoming!!!");
        }
    };

    return (
        <>
            {!showDelete && (
                <button
                    onClick={() => setShowDelete(true)}
                    className="flex transform justify-center rounded-xl bg-glass p-3 px-4  py-2 text-purple-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                >
                    {" "}
                    Delete Review
                </button>
            )}
            {showDelete && (
                <div className="flex gap-5">
                    <button
                        onClick={() => setShowDelete(false)}
                        className="flex transform justify-center rounded-xl bg-glass p-3 px-4  py-2 text-purple-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={deleteReview}
                        className="flex transform justify-center rounded-xl bg-glass p-3 px-4  py-2 text-purple-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                    >
                        Goodbye forever 🫡
                    </button>
                </div>
            )}
        </>
    );
}
