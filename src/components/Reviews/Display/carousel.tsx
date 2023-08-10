import Image from "next/image";
import type { Images } from "@prisma/client";

interface ImageStyles {
    minWidth: string;
    minHeight: string;
    width: string;
    height: string;
    margin?: string;
}

interface ReviewCarouselProps {
    image: Images;
    totalImages: number;
}

export default function ReviewCarousel({
    image,
    totalImages,
}: ReviewCarouselProps) {
    const imageStyles: Record<number, ImageStyles> = {
        1: {
            minWidth: "240px",
            minHeight: "240px",
            width: "240px",
            height: "240px",
        },
        2: {
            minWidth: "220px",
            minHeight: "240px",
            width: "220px",
            height: "240px",
            margin: "0 6px",
        },
        3: {
            minWidth: "155px",
            minHeight: "240px",
            width: "150px",
            height: "240px",
        },
    };

    const style = imageStyles[totalImages];

    return (
        <Image
            src={image.link}
            alt="review"
            className="relative top-6 object-cover"
            style={style}
            height={200}
            width={200}
        />
    );
}
