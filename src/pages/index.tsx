import Image from "next/image";
import greenLogo from "../../public/gch-green-logo.png";
import whiteLogo from "../../public/gch-white-logo.png";
import scissors from "../../public/scissors.png";
import { useState } from "react";

export default function Home() {
    // photo of geni right side
    // sign in graphic style

    // still need photo can use a template for now.

    // No bad hair days on left

    // Below that page scroll
    // left side

    // TODO 3D 3 picture carosuel that has a review under it
    // as each photo is click review under it changes

    // right side this slogan which links to portfolio

    // Your pretty when you get here
    // youre prettier when you leave

    // another page length below

    // a little more personal about me section

    // very bottom of page
    // logos of hair product companies she uses

    // ----------------------------------------------------------------------------------------------------------------

    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [greenLogo, whiteLogo, scissors];

    const handleClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="bg-red-200">
            <h1 className="text-6xl text-red-300">Genevieve Clare Hair</h1>

            <div className="container relative mx-auto flex h-screen items-center justify-center">
                {images.map((image, index) => {
                    const position =
                        (index - currentIndex + 1 + images.length) %
                        images.length;
                    const scale = position === 1 ? 1 : 0.8;
                    return (
                        <Image
                            key={index}
                            src={image}
                            alt={`review photo ${index + 1}`}
                            className={`w-40 cursor-pointer transition-transform duration-300 hover:scale-110 ${
                                index === currentIndex ? "active" : ""
                            }`}
                            style={{
                                transform: `translateX(${
                                    (position - 1) * 100
                                }%) scale(${scale})`,
                                zIndex: images.length - position,
                                opacity: scale === 1 ? 1 : 0.4,
                            }}
                            onClick={() => handleClick(index)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
