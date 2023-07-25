import Image from "next/image";
import firstTime from "@public/first-time.png";

export default function FirstTimeClient() {
    return (
        <div>
            <Image
                src={firstTime.src}
                width={firstTime.width}
                height={firstTime.height}
                alt="First time?"
            />
        </div>
    );
}
