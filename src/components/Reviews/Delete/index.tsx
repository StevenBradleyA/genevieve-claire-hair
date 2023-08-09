import { api } from "~/utils/api";
import type { Session } from "next-auth";

interface DeleteProps {
    id: string;
    session: Session;
    showDelete: boolean;
    setShowDelete: (show: boolean) => void;
}

export default function DeleteReview({
    id,
    session,
    showDelete,
    setShowDelete,
}: DeleteProps) {
    const ctx = api.useContext();

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
            };
            return mutate(data);
        } else {
            throw new Error("Hot Toast Incoming!!!");
        }
    };

    return (
        <>
            {!showDelete && (
                <button onClick={() => setShowDelete(true)} className="">
                    {" "}
                    Delete Review
                </button>
            )}
            {showDelete && (
                <div>
                    <button onClick={deleteReview}>🔥</button>
                    <button onClick={() => setShowDelete(false)}>❎</button>
                </div>
            )}
        </>
    );
}
