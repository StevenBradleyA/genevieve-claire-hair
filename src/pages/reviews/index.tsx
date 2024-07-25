import { useSession } from "next-auth/react";
import DisplayReviews from "~/components/Reviews/Display";
import { useMobile } from "~/components/MobileContext";
import ChooseReview from "~/components/Reviews/Create/chooseReview";
import ScriptButton from "./scriptButton";
import Footer from "~/components/Footer/footer";
import Image from "next/image";
import heart from "@public/Logos/heart-logo.png";
import leftIndent from "@public/HomePage/home-left-indent.png";
import rightIndent from "@public/HomePage/home-right-indent.png";

export default function Reviews() {
    // TODO Give admin god power to delete a review

    const { data: session } = useSession();
    const { isMobile } = useMobile();

    return (
        <>
            <div className="flex w-full flex-col items-center">
                {isMobile ? (
                    <div className="flex flex-col items-center gap-5">
                        <h1 className="font-grandHotel text-6xl text-white ">
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
                    <>
                        <h1 className="relative mt-5 flex w-full justify-center font-archivo text-9xl text-white">
                            REVIEWS
                            <div className=" absolute right-20 flex flex-col gap-5">
                                <Image
                                    alt="heart logo"
                                    src={heart}
                                    className="image-black-to-white h-6 w-6 object-contain ease-in hover:opacity-70"
                                />
                                <Image
                                    alt="heart logo"
                                    src={heart}
                                    className="image-black-to-white h-6 w-6 object-contain ease-in hover:opacity-70"
                                />
                                <Image
                                    alt="heart logo"
                                    src={heart}
                                    className="image-black-to-white h-6 w-6 object-contain ease-in hover:opacity-70"
                                />
                            </div>
                        </h1>
                        <div className="relative mt-5 h-20 w-full bg-white">
                            <Image
                                src={leftIndent}
                                className=" absolute -top-[30px] left-0  w-40"
                                alt="left indent"
                            />
                            <Image
                                src={rightIndent}
                                className=" absolute -top-[30px] right-0  w-40"
                                alt="left indent"
                            />
                            <div className="absolute bottom-28 right-40 flex w-[400px] justify-center font-raleway">
                                {session && session.user ? (
                                    <ChooseReview session={session} />
                                ) : (
                                    <ScriptButton />
                                )}
                            </div>
                        </div>
                    </>
                )}
                <DisplayReviews />
            </div>
            <div className="mt-[28rem] w-full">
                <Footer />
            </div>
        </>
    );
}
