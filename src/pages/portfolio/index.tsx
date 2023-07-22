import { useEffect, useState } from "react";
import { env } from "~/env.mjs";
import Image from "next/image";

interface InstagramFeedItem {
    id: string;
    media_url: string;
    caption: string;
}

interface InstagramApiResponse {
    data: {
        id: string;
        media_url: string;
        caption: string | null;
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
            <h1>Instagram Feed</h1>
            <div>
                {instaFeed.map((post) => (
                    <div key={post.id}>
                        <Image src={post.media_url} alt={post.caption} />
                        <p>{post.caption}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

async function fetchInstagramFeed(
    accessToken: string
): Promise<InstagramFeedItem[]> {
    try {
        const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=${accessToken}`
        );
        const data = (await response.json()) as InstagramApiResponse;
        return data.data.map((post) => ({
            id: post.id,
            media_url: post.media_url,
            caption: post.caption ? post.caption : "No caption",
        }));
    } catch (error) {
        throw new Error("Error fetching Instagram feed");
    }
}
