import Image from "next/image";
import type { Images } from "@prisma/client";
import { useMobile } from "~/components/MobileContext";

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
    const { isMobile } = useMobile();

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

    const mobileImageStyles: Record<number, ImageStyles> = {
        1: {
            minWidth: "210px",
            minHeight: "210px",
            width: "210px",
            height: "210px",
        },
        2: {
            minWidth: "166px",
            minHeight: "210px",
            width: "166px",
            height: "210px",
        },
        3: {
            minWidth: "110px",
            minHeight: "210px",
            width: "110px",
            height: "210px",
        },
    };

    const style = imageStyles[totalImages];
    const mobileStyle = mobileImageStyles[totalImages];

    return isMobile ? (
        <Image
            src={image.link}
            alt="review"
            className="object-cover"
            style={mobileStyle}
            height={200}
            width={200}
        />
    ) : (
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
