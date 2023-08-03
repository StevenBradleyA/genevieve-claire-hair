import { useSession } from "next-auth/react";
import { useState } from "react";
import UpdateReview from "../Update";
import DeleteReview from "../Delete";
import type { ReviewWithUser } from ".";
import { motion, useMotionValue, useTransform } from "framer-motion";
import reviewBackgroundImage from "../../../../public/Holographic/holo-swirl.png";
import Image from "next/image";

export default function ReviewCard({ review }: { review: ReviewWithUser }) {
    const { data: session } = useSession();
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const isHovered = useMotionValue(0);
    const cardRotateX = useTransform(isHovered, [-100, 100], [-10, 10]);
    const cardRotateY = useTransform(isHovered, [-100, 100], [10, -10]);
    const cardBgTranslateX = useTransform(isHovered, [-100, 100], [-20, 20]);
    const cardBgTranslateY = useTransform(isHovered, [-100, 100], [-20, 20]);
    const cardBgOpacity = useTransform(isHovered, [-100, 100], [0.8, 0.5]);
    const cardShadow = useTransform(isHovered, (value) => {
        const boxShadow = [
            `rgba(255, 255, 255, ${0.2 - value * 0.002}) 0 0 40px 5px`,
            `rgba(255, 255, 255, 1) 0 0 0 1px`,
            `rgba(0, 0, 0, 0.66) 0 30px 60px 0`,
            `inset #333 0 0 0 5px`,
            `inset white 0 0 0 6px`,
        ];
        return boxShadow.join(",");
    });

    const handleMouseEnter = () => {
        isHovered.set(1);
    };

    const handleMouseLeave = () => {
        isHovered.set(0);
    };

    return (
        <motion.div
            className="card-wrap cursor-pointer rounded-md border p-4 transition-all"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: "800px",
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                className="card relative flex h-80 w-60 flex-col items-center justify-end rounded-md bg-cover bg-center p-6 shadow-md"
                style={{
                    backgroundImage: `url(${reviewBackgroundImage.src})`,
                    rotateX: cardRotateX,
                    rotateY: cardRotateY,
                    boxShadow: cardShadow,
                }}
            >
                <motion.div
                    className="card-bg absolute inset-0 h-full w-full bg-cover bg-center"
                    style={{
                        opacity: cardBgOpacity,
                        translateX: cardBgTranslateX,
                        translateY: cardBgTranslateY,
                    }}
                ></motion.div>
                <motion.div className="card-info duration-600 translate-y-40 transform text-white transition-all ease-in">
                    {!showUpdate && (
                        <>
                            <div>@{review.user.name}</div>
                            <div>{review.text}</div>
                            <div className="flex gap-1">
                                {Array(review.starRating).fill("⭐️")}
                            </div>
                        </>
                    )}

                    {session && session.user.id === review.userId && (
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
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
