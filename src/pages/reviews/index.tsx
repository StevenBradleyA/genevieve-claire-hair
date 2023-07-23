import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import CreateImage from "../../components/Images/Create";
import DisplayImages from "../../components/Images/Display";
import CreateReview from "~/components/Reviews/Create";
import DisplayReviews from "~/components/Reviews/Display";

export default function Images() {
    //! need to refactor this to include proper userId pass

    const { data: session } = useSession();

    const { data: hasReviewed } = api.review.hasReviewed.useQuery({
        userId: session?.user.id,
    });

    return (
        <div className="flex flex-col items-center bg-rose-400">
            <h1>why hello weary traveler</h1>
            <div>
                {session && session.user && !hasReviewed && <CreateReview />}
            </div>

            <DisplayReviews />
            

            {/* <CreateImage />
            <DisplayImages userId="cljyl59i90000ov93qhw2ujsd" /> */}
        </div>
    );
}
