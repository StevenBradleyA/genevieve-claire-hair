import { motion } from "framer-motion";
import { useMobile } from "~/components/MobileContext";
import Footer from "~/components/Footer/footer";
import leftIndent from "@public/HomePage/home-left-indent.png";
import rightIndent from "@public/HomePage/home-right-indent.png";
import Image from "next/image";
import heart from "@public/Logos/heart-logo.png";
import portfolioOne from "@public/Portfolio/portfolio-1.png";
import portfolioTwo from "@public/Portfolio/portfolio-2.png";
import portfolioThree from "@public/Portfolio/portfolio-3.png";
import portfolioFour from "@public/Portfolio/portfolio-4.png";
import portfolioFive from "@public/Portfolio/portfolio-5.png";
import portfolioSix from "@public/Portfolio/portfolio-6.png";
import portfolioSeven from "@public/Portfolio/portfolio-7.png";
import portfolioEight from "@public/Portfolio/portfolio-8.png";
import portfolioNine from "@public/Portfolio/portfolio-9.png";
import portfolioTen from "@public/Portfolio/portfolio-10.png";
import portfolioEleven from "@public/Portfolio/portfolio-11.png";
import portfolioTwelve from "@public/Portfolio/portfolio-12.png";
import portfolioThirteen from "@public/Portfolio/portfolio-13.png";
import portfolioFourteen from "@public/Portfolio/portfolio-14.png";
import portfolioFifteen from "@public/Portfolio/portfolio-15.png";
import portfolioSixteen from "@public/Portfolio/portfolio-16.png";
import portfolioSeventeen from "@public/Portfolio/portfolio-17.png";
import portfolioEighteen from "@public/Portfolio/portfolio-18.png";
import portfolioNineteen from "@public/Portfolio/portfolio-19.png";
import portfolioTwenty from "@public/Portfolio/portfolio-20.png";
import portfolioTwentyOne from "@public/Portfolio/portfolio-21.png";
import portfolioTwentyTwo from "@public/Portfolio/portfolio-22.png";
import portfolioTwentyThree from "@public/Portfolio/portfolio-23.png";
import portfolioTwentyFour from "@public/Portfolio/portfolio-24.png";
import portfolioTwentyFive from "@public/Portfolio/portfolio-25.png";
import portfolioTwentySix from "@public/Portfolio/portfolio-26.png";
import portfolioTwentySeven from "@public/Portfolio/portfolio-27.png";
import portfolioTwentyEight from "@public/Portfolio/portfolio-28.png";
import portfolioTwentyNine from "@public/Portfolio/portfolio-29.png";
import portfolioThirty from "@public/Portfolio/portfolio-30.png";
import portfolioThirtyOne from "@public/Portfolio/portfolio-31.png";
import portfolioThirtyTwo from "@public/Portfolio/portfolio-32.png";
import portfolioThirtyThree from "@public/Portfolio/portfolio-33.png";
import portfolioThirtyFour from "@public/Portfolio/portfolio-34.png";
import portfolioThirtyFive from "@public/Portfolio/portfolio-35.png";

export default function Portfolio() {
    const { isMobile } = useMobile();

    return (
        <>
            <h1 className="relative mt-5 flex w-full justify-center font-archivo text-5xl text-white laptop:text-9xl">
                PORTFOLIO
                <div className=" absolute right-3 -top-3 laptop:top-0 flex flex-col gap-5 laptop:right-20">
                    <Image
                        alt="heart log rounded-xlo"
                        src={heart}
                        className="image-black-to-white h-3 w-3  ease-in hover:opacity-70  laptop:h-6 laptop:w-6"
                    />
                    <Image
                        alt="heart log rounded-xlo"
                        src={heart}
                        className="image-black-to-white h-3 w-3  ease-in hover:opacity-70  laptop:h-6 laptop:w-6"
                    />
                    <Image
                        alt="heart log rounded-xlo"
                        src={heart}
                        className="image-black-to-white h-3 w-3  ease-in hover:opacity-70  laptop:h-6 laptop:w-6"
                    />
                </div>
            </h1>
            <div className="relative mt-10 h-12 w-full bg-white">
                <Image
                    src={leftIndent}
                    className=" absolute -top-[30px] left-0  w-40"
                    alt="left indent"
                />
                <Image
                    src={rightIndent}
                    className=" absolute -top-[30px] right-0  w-40"
                    alt="left indent"
                />
            </div>
            <div className="flex w-full gap-5 bg-white px-20 py-10">
                <div className="flex w-96 flex-col gap-5">
                    <div className="h-[450px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioTwentySix}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[350px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioTwo}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[300px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioThree}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[500px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioThirtyOne}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[300px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioOne}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[300px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioSix}
                            alt="portfolio photo"
                        />
                    </div>
                </div>
                <div className="flex w-96 flex-col gap-5">
                    <div className="h-[300px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioEleven}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[300px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioSeven}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[500px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioNine}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[300px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioEight}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[350px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioTen}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[350px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioTwelve}
                            alt="portfolio photo"
                        />
                    </div>
                </div>
                <div className="flex w-96 flex-col gap-5">
                    <div className="h-[400px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioFive}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[450px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioSixteen}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[300px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioThirteen}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[250px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioFourteen}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[200px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioFifteen}
                            alt="portfolio photo"
                        />
                    </div>

                    <div className="h-[350px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioSeventeen}
                            alt="portfolio photo"
                        />
                    </div>
                </div>
                <div className="flex w-96 flex-col gap-5">
                    <div className="h-[250px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioTwentyThree}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[350px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioEighteen}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[380px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioNineteen}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[300px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioTwenty}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[450px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioTwentyOne}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[350px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioThirtyThree}
                            alt="portfolio photo"
                        />
                    </div>
                </div>
                <div className="flex w-96 flex-col gap-5">
                    <div className="h-[500px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioTwentyEight}
                            alt="portfolio photo"
                            priority
                        />
                    </div>
                    <div className="h-[350px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioTwentyFive}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[350px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioThirtyFive}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[150px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioTwentySeven}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[500px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioTwentyFour}
                            alt="portfolio photo"
                        />
                    </div>
                    <div className="h-[350px] w-full overflow-hidden rounded-xl">
                        <Image
                            className=" w-full scale-150 bg-lightPurple"
                            src={portfolioTwentyNine}
                            alt="portfolio photo"
                        />
                    </div>
                </div>
            </div>
            <div className="relative h-12 w-full bg-white">
                <Image
                    src={leftIndent}
                    className=" absolute -bottom-[30px] left-0  w-40"
                    alt="left indent"
                />
                <Image
                    src={rightIndent}
                    className=" absolute -bottom-[30px] right-0  w-40"
                    alt="left indent"
                />
            </div>

            <div className="mt-72 w-full">
                <Footer />
            </div>
        </>
    );
}

// <div className="flex flex-wrap justify-center rounded-2xl bg-glass p-10 shadow-2xl">
// {instaFeed.map((post, index) => (
//     <div
//         key={index}
//         className="insta-image-sizing w-full overflow-hidde rounded-xln"
//     >
//         <div className="zoom-effect  w-full rounded-lg scale-150">
//             <Image
//                 src={post.media_url}
//                 alt={post.caption || ""}
//                 width={300}
//                 height={300}
//                 className=" w-full"
//             />
//         </div>
//     </div>
// ))}
// </div>
