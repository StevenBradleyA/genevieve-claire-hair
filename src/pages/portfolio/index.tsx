import { useEffect, useState } from "react";
import { env } from "~/env.mjs";
import Image from "next/image";
import instagramLogo from "../../../public/insta.png";
import blonding from "../../../public/portfolio/blonding.png";
import vivids from "../../../public/portfolio/vivids.png";
import slc from "../../../public/portfolio/slc.png";
import newColorCorrection from "../../../public/portfolio/newCorrection.png";

import { fetchInstagramFeed } from "../api/insta/utils";
import { motion } from "framer-motion";
import { useMobile } from "~/components/MobileContext";
import Footer from "~/components/HomePage/footer";

interface InstagramFeedItem {
    id: string;
    media_url: string;
    caption: string | null;
}

export default function Portfolio() {
    const { isMobile } = useMobile();
    const instaToken = env.NEXT_PUBLIC_INSTA_TOKEN;
    const [instaFeed, setInstaFeed] = useState<InstagramFeedItem[]>([]);

    useEffect(() => {
        if (instaToken) {
            fetchInstagramFeed(instaToken)
                .then((data) => setInstaFeed(data))
                .catch((error) =>
                    console.error("Error fetching Instagram feed:", error)
                );
        }
    }, [instaToken]);

    // ----- animations -----
    const pageVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 2 } },
    };
    // ----- animations end -----

    const handleInstaClick = (e: React.FormEvent) => {
        e.preventDefault();
        const url = "https://www.instagram.com/genevieveclare.hair/";
        window.open(url, "_blank");
    };

    return isMobile ? (
        <div className="flex gap-5">
            {/* Left half*/}
            <div className="w-44">
                <div className=" instagram-header mb-5 flex h-20 items-center justify-center rounded-2xl shadow-xl">
                    <h1 className="ml-5 font-grand-hotel text-3xl text-white">
                        Instagram
                    </h1>
                    <Image
                        alt="instagram"
                        src={instagramLogo}
                        className=" w-20 cursor-pointer object-cover"
                        onClick={handleInstaClick}
                    />
                </div>
                <div className="flex flex-wrap justify-center rounded-2xl bg-glass p-3 shadow-2xl">
                    {instaFeed.map((post, index) => (
                        <div
                            key={index}
                            className="insta-image-sizing-mobile w-full overflow-hidden"
                        >
                            <div className="zoom-effect h-full w-full rounded-lg object-cover">
                                <Image
                                    src={post.media_url}
                                    alt={post.caption || ""}
                                    width={300}
                                    height={300}
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right half*/}
            <div className="flex w-44 flex-col items-center font-grand-hotel text-3xl  text-white">
                <div className="mb-5 flex flex-col items-center ">
                    <div className=" instagram-header mb-5 flex h-20 w-full items-center justify-center rounded-2xl shadow-xl">
                        <h1>Blonding</h1>
                    </div>
                    <Image
                        src={blonding}
                        alt="blonding"
                        className=" w-auto rounded-2xl"
                        priority={true}
                    />
                </div>
                <div className="mb-5 flex flex-col items-center">
                    <div className=" instagram-header mb-5 flex h-20 w-full items-center justify-center rounded-2xl shadow-xl">
                        <h1>Vivids</h1>
                    </div>
                    <Image
                        src={vivids}
                        alt="vivids"
                        className="w-auto rounded-2xl"
                    />
                </div>
                <div className="mb-5 flex flex-col items-center ">
                    <div className=" instagram-header mb-5 flex h-20 w-full items-center justify-center rounded-2xl shadow-xl">
                        <h1>Color Correction</h1>
                    </div>
                    <Image
                        src={newColorCorrection}
                        alt="color correction"
                        className="w-auto rounded-2xl"
                    />
                </div>
                <div className="mb-5 flex flex-col items-center">
                    <div className=" instagram-header mb-5 flex h-20 w-full items-center justify-center rounded-2xl shadow-xl">
                        <h1>Short Length Cut</h1>
                    </div>
                    <Image
                        src={slc}
                        alt="short length cut"
                        className="w-auto rounded-2xl"
                    />
                </div>
            </div>
        </div>
    ) : (
        <div className="flex flex-col">
            <motion.div
                className="flex"
                initial="hidden"
                animate="visible"
                variants={pageVariants}
            >
                {/* Left half*/}
                <div className=" w-2/3 px-10 full:w-2/3">
                    <div className=" instagram-header mb-12 flex h-20 items-center justify-center rounded-2xl shadow-xl">
                        <h1 className=" gap-5 font-grand-hotel text-8xl text-white">
                            Instagram
                        </h1>
                        <Image
                            alt="instagram"
                            src={instagramLogo}
                            className=" w-40 cursor-pointer object-cover"
                            onClick={handleInstaClick}
                        />
                    </div>
                    <div className="flex flex-wrap justify-center rounded-2xl bg-glass p-10 shadow-2xl">
                        {instaFeed.map((post, index) => (
                            <div
                                key={index}
                                className="insta-image-sizing w-full overflow-hidden"
                            >
                                <div className="zoom-effect h-full w-full rounded-lg object-cover">
                                    <Image
                                        src={post.media_url}
                                        alt={post.caption || ""}
                                        width={300}
                                        height={300}
                                        className="h-full w-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right half*/}
                <div className="flex w-1/3 flex-col items-center px-10">
                    <div className="mb-10 flex flex-col items-center">
                        <div className=" instagram-header mb-12 flex h-20 w-full items-center justify-center rounded-2xl shadow-xl">
                            <h1 className=" gap-5 font-grand-hotel text-8xl text-white">
                                Blonding
                            </h1>
                        </div>
                        <Image
                            src={blonding}
                            alt="blonding"
                            className=" w-auto rounded-2xl"
                        />
                    </div>
                    <div className="mb-10 flex flex-col items-center">
                        <div className=" instagram-header mb-12 flex h-20 w-full items-center justify-center rounded-2xl shadow-xl">
                            <h1 className=" gap-5 font-grand-hotel text-8xl text-white">
                                Vivids
                            </h1>
                        </div>
                        <Image
                            src={vivids}
                            alt="vivids"
                            className="w-auto rounded-2xl"
                        />
                    </div>
                    <div className="mb-10 flex flex-col items-center ">
                        <div className=" instagram-header mb-12 flex h-20 w-full items-center justify-center rounded-2xl shadow-xl">
                            <h1 className=" gap-5 font-grand-hotel text-7xl text-white">
                                Color Correction
                            </h1>
                        </div>
                        <Image
                            src={newColorCorrection}
                            alt="color correction"
                            className="w-auto rounded-2xl"
                        />
                    </div>
                    <div className="mb-10 flex flex-col items-center">
                        <div className=" instagram-header mb-12 flex h-20 w-full items-center justify-center rounded-2xl shadow-xl">
                            <h1 className=" gap-5 font-grand-hotel text-7xl text-white">
                                Short Length Cut
                            </h1>
                        </div>
                        <Image
                            src={slc}
                            alt="short length cut"
                            className="w-auto rounded-2xl"
                        />
                    </div>
                </div>
            </motion.div>
            <Footer />
        </div>
    );
}
