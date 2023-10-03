import { useSession } from "next-auth/react";
import DisplayReviews from "~/components/Reviews/Display";
import { useMobile } from "~/components/MobileContext";
import ChooseReview from "~/components/Reviews/Create/chooseReview";
import ScriptButton from "./scriptButton";
import Footer from "~/components/HomePage/footer";

export default function Reviews() {
    // TODO Test Modals on mobile
    // TODO Give admin god power to delete a review

    const { data: session } = useSession();
    const { isMobile } = useMobile();

    return (
        <div className="flex w-full flex-col items-center">
            {isMobile ? (
                <div className="flex flex-col items-center gap-10">
                    <h1 className="font-grand-hotel text-8xl text-white ">
                        Reviews
                    </h1>
                    <div className="flex w-[400px] justify-center">
                        {session && session.user ? (
                            <ChooseReview session={session} />
                        ) : (
                            <ScriptButton />
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-32">
                    <h1 className="font-grand-hotel text-9xl text-white ">
                        Reviews
                    </h1>
                    <div className="flex w-[400px] justify-center">
                        {session && session.user ? (
                            <ChooseReview session={session} />
                        ) : (
                            <ScriptButton />
                        )}
                    </div>
                </div>
            )}
            <DisplayReviews />
            <Footer />
        </div>
    );
}
