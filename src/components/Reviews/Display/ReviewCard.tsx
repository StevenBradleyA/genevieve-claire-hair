import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UpdateReview from "../Update";
import DeleteReview from "../Delete";
import type { ReviewWithUser } from ".";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { MotionValue } from "framer-motion";

import reviewBackgroundImage from "../../../../public/Holographic/holo-swirl.png";

// attempt to delay

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
                className="card relative flex h-60 w-96 flex-col items-center justify-end rounded-md bg-cover bg-center p-6 shadow-md"
                style={{
                    backgroundImage: `url(${reviewBackgroundImage.src})`,
                    rotateX: rotateX,
                    rotateY: rotateY,
                    boxShadow: useTransform(
                        shadowBlur,
                        (value) =>
                            `rgba(0, 0, 0, 0.4) ${shadowX.get()}px ${shadowY.get()}px ${value}px`
                    ),
                }}
            >
                <motion.div className="w-96 px-5 text-white flex flex-col gap-2">
                    {!showUpdate && (
                        <>
                            <div className="flex gap-5">
                                <div className=" flex h-14 w-14 items-center justify-center rounded-full bg-lightPurple text-4xl">
                                    {review.user.name? review.user.name[0]: null}
                                </div>
                                <div>
                                    <div className="relative text-2xl font-semibold">
                                        {review.user.name}
                                    </div>
                                    <div className="flex gap-1">
                                        {Array(review.starRating).fill("⭐️")}
                                    </div>
                                </div>
                            </div>
                            <p className="h-28 flex-wrap break-words  text-white">
                                {review.text}
                                {` pogs i hada great time geni is the best ever woowowowwolaskdjfl;askjdfowwowowowowolskdjfl;askjdfl;aksjdflkjsdfkjasldfkj`}
                            </p>
                        </>
                    )}

                    {/* {session && session.user.id === review.userId && (
                        <>
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
                        </>
                    )} */}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
