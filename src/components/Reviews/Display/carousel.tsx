// import Image from "next/image";
import type { Images } from "@prisma/client";

export default function ReviewCarousel({ image }: { image: Images }) {
    console.log(image);
    return (
        <>
            <img
                src={image.link}
                alt="review"
                className="h-40 w-36 object-cover"
            />
        </>
    );
}
