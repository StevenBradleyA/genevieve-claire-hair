import { useEffect, useState } from "react";
import { env } from "~/env.mjs";
import Image from "next/image";
import instagramLogo from "../../../public/insta.png";
// import { useRouter } from "next/router";
import blonding from "../../../public/portfolio/blonding.png";
import vivids from "../../../public/portfolio/vivids.png";
import colorCorrection from "../../../public/portfolio/color-correction.png";
import slc from "../../../public/portfolio/slc.png";

import { fetchInstagramFeed } from "../api/insta/utils";
import { motion, AnimatePresence } from "framer-motion";

interface InstagramFeedItem {
    id: string;
    media_url: string;
    caption: string | null;
}

export default function Portfolio() {
    const instaToken = env.NEXT_PUBLIC_INSTA_TOKEN;
    const [instaFeed, setInstaFeed] = useState<InstagramFeedItem[]>([]);
    // const router = useRouter();
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
        visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
    };

    const staggerVariants = {
        hidden: { opacity: 0 },
        visible: (index: number) => ({
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: index * 0.12,
            },
        }),
    };
    const contentStaggerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.5,
            },
        }),
    };

    // -----  end animations -----

    // TODO decide if we want a redirect or new tab open

    // const handleInstaClick = () => {
    //     router.push('https://www.instagram.com/genevieveclare.hair/')
    //       .then(() => {
    //         // You can perform any additional actions here if needed
    //       })
    //       .catch((error) => {
    //         console.error('Error navigating to Instagram:', error);
    //       });
    //   };

    // new tab
    const handleInstaClick = (e: React.FormEvent) => {
        e.preventDefault();
        const url = "https://www.instagram.com/genevieveclare.hair/";
        window.open(url, "_blank");
    };

    return (
        <motion.div
            className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2"
            initial="hidden"
            animate="visible"
            variants={pageVariants}
        >
            {/* Left half*/}
            <div className="w-full">
                <div className=" instagram-header mb-12 flex h-20 items-center justify-center">
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
                <div className="flex flex-wrap">
                    <AnimatePresence>
                        {instaFeed.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial="hidden"
                                animate="visible"
                                custom={index}
                                variants={staggerVariants}
                                className="w-full overflow-hidden sm:w-1/2 md:w-1/3 lg:w-1/4"
                                style={{ width: "300px", height: "300px" }}
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
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right half*/}
            <div className="flex w-full flex-col items-center">
                <AnimatePresence>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        variants={contentStaggerVariants}
                        className="mb-10 flex flex-col items-center"
                    >
                        <h1 className="mb-5 text-8xl text-white font-grand-hotel">Blonding</h1>
                        <Image
                            src={blonding}
                            alt="blonding"
                            className=" w-auto"
                        />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        variants={contentStaggerVariants}
                        className="mb-10 flex flex-col items-center"
                    >
                        <h1 className="mb-5 text-8xl text-white font-grand-hotel">Vivids</h1>
                        <Image src={vivids} alt="blonding" />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        variants={contentStaggerVariants}
                        className="mb-10 flex flex-col items-center "
                    >
                        <h1 className="mb-5 text-8xl text-white font-grand-hotel">
                            Color Correction
                        </h1>
                        <Image src={colorCorrection} alt="blonding" />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={3}
                        variants={contentStaggerVariants}
                        className="mb-10 flex flex-col items-center"
                    >
                        <h1 className="mb-5 text-8xl text-white font-grand-hotel">
                            Short Length Cut
                        </h1>
                        <Image src={slc} alt="blonding" />
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
