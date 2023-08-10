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
            minWidth: "220px",
            minHeight: "220px",
            width: "220px",
            height: "220px",
        },
        2: {
            minWidth: "195px",
            minHeight: "220px",
            width: "195px",
            height: "220px",
        },
        3: {
            minWidth: "130px",
            minHeight: "220px",
            width: "130px",
            height: "220px",
        },
    };

    const style = imageStyles[totalImages];

    return (
        <Image
            src={image.link}
            alt="review"
            className="object-cover"
            style={style}
            height={200}
            width={200}
        />
    );
}
