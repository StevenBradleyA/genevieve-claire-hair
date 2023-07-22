import { useEffect, useState } from "react";
import { env } from "~/env.mjs";
import Image from "next/image";

interface InstagramFeedItem {
    id: string;
    media_url: string;
    caption: string | null;
}

interface InstagramCarouselItem {
    id: string;
    media_url: string;
    media_type: "IMAGE" | "CAROUSEL_ALBUM";
}

interface InstagramApiResponse {
    data: {
        id: string;
        media_type: "IMAGE" | "CAROUSEL_ALBUM";
        media_url: string;
        caption: string | null;
        children?: { data: InstagramCarouselItem[] };
    }[];
}

export default function Portfolio() {
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

    return (
        <>
            <h1 className="text-6xl text-white">Insta </h1>

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
        </>
    );
}
// caption hover idea
{
    /* <div className="grid grid-cols-3 gap-4">
                {instaFeed.map((post) => (
                    <div key={post.id} className="group relative">
                        <Image
                            src={post.media_url}
                            alt={post.caption || ""}
                            width={300}
                            height={300}
                        />
                        <img src={post.media_url} alt={post.caption || ""} />

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="rounded-md bg-gray-800 p-2 text-center text-white">
                                {post.caption || "No caption"}
                            </div>
                        </div>
                    </div>
                ))}
            </div> */
}

async function fetchInstagramFeed(
    accessToken: string
): Promise<InstagramFeedItem[]> {
    try {
        const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,children{media_type,media_url}&access_token=${accessToken}`
        );
        const data = (await response.json()) as InstagramApiResponse;

        const filteredData = data.data.filter(
            (post) =>
                post.media_type === "IMAGE" ||
                post.media_type === "CAROUSEL_ALBUM"
        );

        const feedItems: InstagramFeedItem[] = [];
        for (const post of filteredData) {
            if (post.media_type === "IMAGE") {
                feedItems.push({
                    id: post.id,
                    media_url: post.media_url,
                    caption: post.caption ? post.caption : "No caption",
                });
            } else if (post.media_type === "CAROUSEL_ALBUM" && post.children) {
                for (const child of post.children.data) {
                    if (child.media_type === "IMAGE") {
                        feedItems.push({
                            id: child.id,
                            media_url: child.media_url,
                            caption: post.caption ? post.caption : "No caption",
                        });
                    }
                }
            }
        }

        return feedItems;
    } catch (error) {
        throw new Error("Error fetching Instagram feed");
    }
}
