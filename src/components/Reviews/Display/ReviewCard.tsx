import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UpdateReview from "../Update";
import DeleteReview from "../Delete";
import type { ReviewWithUser } from ".";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { MotionValue } from "framer-motion";

import reviewBackgroundImage from "../../../../public/glass-1.png";

// TODO refactor update review to a modal
// TODO change background to glass morphism to match pricing page and update review color

export default function ReviewCard({ review }: { review: ReviewWithUser }) {
    const { data: session } = useSession();
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [showUpdate, setShowUpdate] = useState<boolean>(false);
    const mouseX: MotionValue<number> = useMotionValue(0);
    const mouseY: MotionValue<number> = useMotionValue(0);

    const handleMouseMove = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const cardCenterX: number = window.innerWidth / 2;
        const cardCenterY: number = window.innerHeight / 2;
        const offsetX: number = event.pageX - cardCenterX;
        const offsetY: number = event.pageY - cardCenterY;
        const rotateXValue: number =
            offsetY > 0
                ? (-offsetY / cardCenterY) * 20
                : (-offsetY / cardCenterY) * 20;
        const rotateYValue: number = (offsetX / cardCenterX) * 40;

        mouseX.set(offsetX);
        mouseY.set(offsetY);
        rotateX.set(rotateXValue);
        rotateY.set(rotateYValue);
    };

    const handleMouseLeave = () => {
        // Add a delay before starting the animations
        setTimeout(() => {
            animate(mouseX, 0, { duration: 0.3 });
            animate(mouseY, 0, { duration: 0.3 });
            animate(rotateX, 0, { duration: 0.3 });
            animate(rotateY, 0, { duration: 0.3 });
        }, 500);
    };

    const rotateX: MotionValue<number> = useMotionValue(0);
    const rotateY: MotionValue<number> = useMotionValue(0);
    const shadowX: MotionValue<number> = useTransform(
        rotateY,
        [-10, 10],
        [-25, 25]
    );
    const shadowY: MotionValue<number> = useTransform(
        rotateX,
        [-10, 10],
        [-25, 25]
    );
    const shadowBlur: MotionValue<number> = useTransform(
        rotateX,
        [-10, 10],
        [10, 30]
    );

    return (
        <div className="flex flex-col">
            <motion.div
                className="card-wrap cursor-pointer rounded-md border p-4 transition-all"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    perspective: "800px",
                    transformStyle: "preserve-3d",
                }}
            >
                <motion.div
                    className="relative flex h-60 w-96 flex-col items-center justify-end rounded-md bg-cover bg-center p-6 shadow-md"
                    style={{
                        // backgroundImage: `url(${reviewBackgroundImage.src})`,
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        rotateX: rotateX,
                        rotateY: rotateY,
                        boxShadow: useTransform(
                            shadowBlur,
                            (value) =>
                                `rgba(0, 0, 0, 0.1) ${shadowX.get()}px ${shadowY.get()}px ${value}px`
                        ),
                    }}
                >
                    <motion.div className="flex w-96 flex-col gap-2 px-5 text-white">
                        {!showUpdate && (
                            <>
                                <div className="flex gap-5">
                                    <div className=" flex h-14 w-14 items-center justify-center rounded-full bg-lightPurple text-4xl">
                                        {review.user.name
                                            ? review.user.name[0]
                                            : null}
                                    </div>
                                    <div>
                                        <div className="text-2xl font-semibold">
                                            {review.user.name}
                                        </div>
                                        <div className="text-image flex gap-1">
                                            {Array(review.starRating).fill(
                                                "⭐️"
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="h-32 overflow-y-auto break-words">
                                    <p className="bg-gradient-to-r from-violet-300 via-indigo-300 to-pink-300 bg-clip-text text-transparent">
                                        {review.text}{" "}
                                        {`holy ; asfjkl; djkl; l; as even longer aslkdfj al;ksdfj lsjkal; djkl ;fjkl; jkl; asdjk;l fjkl; ljk asdlj kfl jkasdjkl fjkl asdjkl; asdfjkl adfjkl sajkl sdfjkl dasl jk a fjkl asdf jkl adfs jkl dasf jkl dfs jkl dsf jkl sdfajkl dfas jkl asdf jkl dfas jkl asdf jkl asdf jkl; sadf jkl asdf jkl sadf jkl; asdf jkl adjkl adfjkl asdf jl kasdf jkl a dfsjkl a dfslajl sdfjkal jkl; dfjkl asdf ljkl sdf jkl  sdfjkl asdf jkl asdfjkldfjkl;s  jkl; f ajkl dsafjkl  asdfjkl  fdsjkl; asdf jkl asdf jkl asdf jkl asdf jkl dfas jkl; asdf jkl asdf jkl df asjkl asdf jkl df asjkl asdf jkl adf sjkl adfs jl asdf jkl adfs jkl df jkl dfs ajkl dfas jkl asdf jlk df sjkl sdfa jkl asdf jkl asdf jkl df jkl sdf ajkl asdf jkl; asdf ;kasdj f;lkjas;ldkf j;laksjd fl;kasjdkl; fjkl; asdjkl; fkl jsfadjkl; l;dfsajkldfjkl; sajkl; asdfjkl; ;jl f; jasfdjkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jl;k jkl; jkl; jkl; jkl; jkl; lj k;lj; ljk; jkl ljk jkl jkl; jkl jkl jkl jkl jkl jkl jkl  jkl jkljkl jkl; jkl jkl ;jkl; jkl; asdlflljkajkls; djkl;f jkl; asdjkl; fjkl; asdlfk;j asl;kdfjlkasjdfl;kjsadlkfjlsdjfljweoiruwoeiru oweiru weoiru oweiur oiweu roweiu roiwue roiwueoriuw eoiruwoeiru woeiru weoiru df;asdfl;j jl; that was soooo werid wtd skadfl;jkfasld; j;asfdjl; ksfjkl; dajl; asdfjl;jfkjkl; big poggies woggy als;kdjf al;skdjf lkasjdf ;kljas dfl;kjas dl;fkj asl;dkfj l; jsda asdfjkl; fjkl; asdjkl; asdfjl; kasdfj ;jf`}
                                    </p>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>
            {session && session.user.id === review.userId && (
                <div className="flex justify-center">
                    {!showDelete && (
                        <UpdateReview
                            review={review}
                            session={session}
                            showUpdate={showUpdate}
                            setShowUpdate={setShowUpdate}
                        />
                    )}

                    {!showUpdate && (
                        <DeleteReview
                            id={review.id}
                            session={session}
                            showDelete={showDelete}
                            setShowDelete={setShowDelete}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
