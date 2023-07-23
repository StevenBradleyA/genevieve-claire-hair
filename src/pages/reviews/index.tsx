import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import CreateImage from "../../components/Images/Create";
import DisplayImages from "../../components/Images/Display";
import CreateReview from "~/components/Reviews/Create";
import DisplayReviews from "~/components/Reviews/Display";

export default function Reviews() {
    // TODO Decide if we want create review to be linked to a booking
    // could display type of booking on each review

    // TODO Add total Star Rating 
    // TODO Give admin god power to delete a review 
    // TODO Add Date to Review  Month/Year

    // TODO First name and Last Name on Review 
    // TODO First Letter of name display if no profile pic if that's optional. How does this work with OAUTH????

    // could make cool progress bar for review have a logo fill up all the way at a five star total etc... 

    const { data: session } = useSession();

    const { data: hasReviewed } = api.review.hasReviewed.useQuery({
        userId: session?.user.id,
    });

    return (
        <div className="flex flex-col items-center bg-rose-400">
            <h1>Reviews</h1>
            <div>
                {session && session.user && !hasReviewed && <CreateReview />}
            </div>

            <DisplayReviews />

            {/* <CreateImage />
            <DisplayImages userId="cljyl59i90000ov93qhw2ujsd" /> */}
        </div>
    );
}
