import { useSession } from "next-auth/react";
import DisplayReviews from "~/components/Reviews/Display";
import { useMobile } from "~/components/MobileContext";
import ChooseReview from "~/components/Reviews/Create/chooseReview";
import ScriptButton from "./scriptButton";
import Footer from "~/components/Footer/footer";

export default function Reviews() {
    // TODO Give admin god power to delete a review

    const { data: session } = useSession();
    const { isMobile } = useMobile();

    return (
        <>
            <div className="flex w-full flex-col items-center">
                {isMobile ? (
                    <div className="flex flex-col items-center gap-5">
                        <h1 className="font-grand-hotel text-6xl text-white ">
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
            </div>
            <div className="mt-[28rem] w-full">
                <Footer />
            </div>
        </>
    );
}
