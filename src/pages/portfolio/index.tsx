import { useEffect, useState } from "react";
import { env } from "~/env.mjs";
import Image from "next/image";
import instagramLogo from "../../../public/temp-insta-logo.png";
// import { useRouter } from "next/router";
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
                <div className="flex items-center justify-center">
                    <h1 className="mb-8 flex gap-5 text-6xl text-white">
                        Insta
                        <Image
                            alt="instagram"
                            src={instagramLogo}
                            className=" w-14 cursor-pointer"
                            onClick={handleInstaClick}
                        />
                    </h1>
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
                        className="mb-40"
                    >
                        <h1 className="text-6xl text-white ">Blonding</h1>
                        <h3>this will be a custom graphic </h3>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        variants={contentStaggerVariants}
                        className="mb-40"
                    >
                        <h1 className="text-6xl text-white">Vivids</h1>
                        <h3>this will be a custom graphic </h3>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        variants={contentStaggerVariants}
                        className="mb-40"
                    >
                        <h1 className="text-6xl text-white">
                            Color Correction
                        </h1>
                        <h3>this will be a custom graphic </h3>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={3}
                        variants={contentStaggerVariants}
                        className="mb-40"
                    >
                        <h1 className="text-6xl text-white">
                            Short Length Cut
                        </h1>
                        <h3>this will be a custom graphic </h3>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
