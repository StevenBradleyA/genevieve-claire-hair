import { useEffect, useState } from "react";
import { env } from "~/env.mjs";
import Image from "next/image";
import instagramLogo from "../../../public/temp-insta-logo.png";
// import { useRouter } from "next/router";
import { fetchInstagramFeed } from "../api/insta/utils";

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

    // todo decide if we want a redirect or new tab open

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
        <>
            <div className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2">
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
                        {instaFeed.map((post) => (
                            <div
                                key={post.id}
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
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right half*/}
                <div className="flex w-full flex-col items-center">
                    <div className=" mb-40">
                        <h1 className="text-6xl text-white ">Blonding</h1>
                        <h3>this will be a custom graphic </h3>
                    </div>
                    <div className=" mb-40">
                        <h1 className="text-6xl text-white">Vivids</h1>
                        <h3>this will be a custom graphic </h3>
                    </div>
                    <div className=" mb-40">
                        <h1 className="text-6xl text-white">
                            Color Correction
                        </h1>
                        <h3>this will be a custom graphic </h3>
                    </div>
                    <div className=" mb-40">
                        <h1 className="text-6xl text-white">
                            Short Length Cut
                        </h1>
                        <h3>this will be a custom graphic </h3>
                    </div>
                </div>
            </div>
        </>
    );
}
