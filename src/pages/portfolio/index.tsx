// import { useEffect, useState } from "react";
// import { env } from "~/env.mjs";
// import instagramLogo from "@public/icons/insta.png";
// import blonding from "@public/portfolio/blonding.png";
// import vivids from "@public/portfolio/vivids.png";
// import colorCorrection from "@public/Portfolio/colorCorrection.png";
// import slc from "@public/Portfolio/haircut.png";
// import { fetchInstagramFeed } from "../api/insta/utils";
import { motion } from "framer-motion";
import { useMobile } from "~/components/MobileContext";
import Footer from "~/components/Footer/footer";
import leftIndent from "@public/HomePage/home-left-indent.png";
import rightIndent from "@public/HomePage/home-right-indent.png";
import Image from "next/image";
import heart from "@public/Logos/heart-logo.png";

interface InstagramFeedItem {
    id: string;
    media_url: string;
    caption: string | null;
}

export default function Portfolio() {
    const { isMobile } = useMobile();

    // const instaToken = env.NEXT_PUBLIC_INSTA_TOKEN;
    // const [instaFeed, setInstaFeed] = useState<InstagramFeedItem[]>([]);

    // useEffect(() => {
    //     if (instaToken) {
    //         fetchInstagramFeed(instaToken)
    //             .then((data) => setInstaFeed(data))
    //             .catch((error) =>
    //                 console.error("Error fetching Instagram feed:", error)
    //             );
    //     }
    // }, [instaToken]);

    // ----- animations -----
    // const pageVariants = {
    //     hidden: { opacity: 0, y: -50 },
    //     visible: { opacity: 1, y: 0, transition: { duration: 2 } },
    // };
    // ----- animations end -----

    // const handleInstaClick = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const url = "https://www.instagram.com/genevieveclare.hair/";
    //     window.open(url, "_blank");
    // };

    return (
        <>
            <h1 className="relative mt-5 flex w-full justify-center font-archivo text-9xl text-white">
                PORTFOLIO
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
            <div className="relative mt-10 h-12 w-full bg-white">
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
            </div>
            <div className="flex w-full gap-5   bg-white px-20 py-10 ">
                <div className="flex w-96 flex-col gap-5">
                    <div className="h-[250px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[350px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[150px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[200px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[300px] w-full rounded-xl bg-lightPurple"></div>
                </div>
                <div className="flex w-96 flex-col gap-5">
                    <div className="h-[300px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[200px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[400px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[150px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[350px] w-full rounded-xl bg-lightPurple"></div>
                </div>
                <div className="flex w-96 flex-col gap-5">
                    <div className="h-[150px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[300px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[250px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[200px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[350px] w-full rounded-xl bg-lightPurple"></div>
                </div>
                <div className="flex w-96 flex-col gap-5">
                    <div className="h-[250px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[350px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[180px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[300px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[250px] w-full rounded-xl bg-lightPurple"></div>
                </div>
                <div className="flex w-96 flex-col gap-5">
                    <div className="h-[300px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[200px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[350px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[150px] w-full rounded-xl bg-lightPurple"></div>
                    <div className="h-[350px] w-full rounded-xl bg-lightPurple"></div>
                </div>
            </div>
            <div className="relative h-12 w-full bg-white">
                <Image
                    src={leftIndent}
                    className=" absolute -bottom-[30px] left-0  w-40"
                    alt="left indent"
                />
                <Image
                    src={rightIndent}
                    className=" absolute -bottom-[30px] right-0  w-40"
                    alt="left indent"
                />
            </div>

            <div className="mt-72 w-full">
                <Footer />
            </div>
        </>
    );
}

// <div className="flex flex-wrap justify-center rounded-2xl bg-glass p-10 shadow-2xl">
// {instaFeed.map((post, index) => (
//     <div
//         key={index}
//         className="insta-image-sizing w-full overflow-hidden"
//     >
//         <div className="zoom-effect h-full w-full rounded-lg object-cover">
//             <Image
//                 src={post.media_url}
//                 alt={post.caption || ""}
//                 width={300}
//                 height={300}
//                 className="h-full w-full"
//             />
//         </div>
//     </div>
// ))}
// </div>
