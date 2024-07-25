// import { useEffect, useState } from "react";
// import { env } from "~/env.mjs";
// import Image from "next/image";
// import instagramLogo from "@public/icons/insta.png";
// import blonding from "@public/portfolio/blonding.png";
// import vivids from "@public/portfolio/vivids.png";
// import colorCorrection from "@public/Portfolio/colorCorrection.png";
// import slc from "@public/Portfolio/haircut.png";
// import { fetchInstagramFeed } from "../api/insta/utils";
import { motion } from "framer-motion";
import { useMobile } from "~/components/MobileContext";
import Footer from "~/components/Footer/footer";
import { useEffect, useRef } from "react";

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
            <div className=" w-full p-10">
                <h1 className="font-archivo text-9xl text-white/50">
                    PORTFOLIO
                </h1>
                <div className="flex w-full gap-5  rounded-3xl bg-white px-20 py-10">
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
                        <div className="h-[150px] w-full rounded-xl bg-lightPurple"></div>
                        <div className="h-[300px] w-full rounded-xl bg-lightPurple"></div>
                        <div className="h-[200px] w-full rounded-xl bg-lightPurple"></div>
                    </div>
                    <div className="flex w-96 flex-col gap-5">
                        <div className="h-[300px] w-full rounded-xl bg-lightPurple"></div>
                        <div className="h-[200px] w-full rounded-xl bg-lightPurple"></div>
                        <div className="h-[350px] w-full rounded-xl bg-lightPurple"></div>
                        <div className="h-[150px] w-full rounded-xl bg-lightPurple"></div>
                        <div className="h-[250px] w-full rounded-xl bg-lightPurple"></div>
                    </div>
                </div>
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
