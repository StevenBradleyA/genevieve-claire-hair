import Image from "next/image";
import lsp1 from "../../public/1.png";
import lsp2 from "../../public/2.png";
import lsp3 from "../../public/3.png";
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

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const images = [lsp1, lsp2, lsp3];

    const handleCarouselClick = (index: number): void => {
        if (index !== currentIndex) {
            setCurrentIndex(index);
        }
    };

    return (
        <div className="bg-red-200">
            <h1 className="text-6xl text-red-300">Genevieve Clare Hair</h1>
            <div className="container relative mx-auto flex h-screen items-center justify-center">
                {images.map((image, index) => {
                    const distanceFromCenter = index - currentIndex;
                    let translateX = 0;
                    if (distanceFromCenter === 0) {
                        translateX = -33;
                    } else if (
                        distanceFromCenter === 1 ||
                        distanceFromCenter === -2
                    ) {
                        translateX = 50;
                    } else if (
                        distanceFromCenter === -1 ||
                        distanceFromCenter === 2
                    ) {
                        translateX = -50;
                    }

                    const zIndex = distanceFromCenter === 0 ? 1 : 0;
                    const scale = distanceFromCenter === 0 ? 1 : 0.8;
                    const opacity = scale === 1 ? 1 : 0.4;

                    return (
                        <Image
                            key={index}
                            src={image}
                            alt={`review photo ${index + 1}`}
                            className={`w-40 cursor-pointer transition-transform duration-300 hover:scale-110 ${
                                distanceFromCenter === 0 ? "active" : ""
                            }`}
                            style={{
                                transform: `translateX(${translateX}%) scale(${scale})`,
                                zIndex,
                                opacity,
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                marginLeft:
                                    distanceFromCenter === 0 ? "-10%" : "-20%",
                                transformOrigin: "center center",
                            }}
                            onClick={() => handleCarouselClick(index)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
