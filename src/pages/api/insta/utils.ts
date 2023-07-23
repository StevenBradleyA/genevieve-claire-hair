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

export { fetchInstagramFeed };
