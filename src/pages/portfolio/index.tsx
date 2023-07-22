import { useEffect, useState } from "react";
import { env } from "~/env.mjs";

export default function Portfolio() {
    const instaToken = env.NEXT_PUBLIC_INSTA_TOKEN;
    const instaSecret = env.NEXT_PUBLIC_INSTA_SECRET;
    const instaAppId = env.NEXT_PUBLIC_INSTA_APP_ID;
    const [instaFeed, setInstaFeed] = useState([]);

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
                        <img src={post.media_url} alt={post.caption} />
                        <p>{post.caption}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

async function fetchInstagramFeed(accessToken) {
    try {
        const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=${accessToken}`
        );
        const data = await response.json();
        return data.data.map((post) => ({
            id: post.id,
            media_url: post.media_url,
            caption: post.caption ? post.caption : "No caption",
        }));
    } catch (error) {
        throw new Error("Error fetching Instagram feed");
    }
}
