import { api } from "~/utils/api";
import type { Review } from "@prisma/client";
import ReviewCard from "./ReviewCard";
import { DotLoader } from "react-spinners";

export type ReviewWithUser = Review & {
    user: {
        name: string | null;
        firstName: string | null;
        lastName: string | null;
    };
};

export default function DisplayReviews() {
    const { data: reviews, isLoading } = api.review.getAll.useQuery();
    if (isLoading)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
            </div>
        );

    if (!reviews) return null;

    const reversedReviews = [...reviews].reverse();

    return (
        <div className=" mt-10 flex w-full flex-wrap justify-center gap-10 px-10">
            {reversedReviews.map((review: ReviewWithUser, i: number) => {
                return <ReviewCard key={i} review={review} />;
            })}
        </div>
    );
}
