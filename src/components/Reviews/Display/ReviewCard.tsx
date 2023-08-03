import { useSession } from "next-auth/react";
import { useState } from "react";
import UpdateReview from "../Update";
import DeleteReview from "../Delete";
import type { ReviewWithUser } from ".";
import { motion, useMotionValue, useTransform } from "framer-motion";
import reviewBackgroundImage from "../../../../public/Holographic/holo-swirl.png";

export default function ReviewCard({ review }: { review: ReviewWithUser }) {
    const { data: session } = useSession();
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event: MouseEvent) => {
        const cardCenterX = window.innerWidth / 2;
        const cardCenterY = window.innerHeight / 2;
        const offsetX = event.pageX - cardCenterX;
        const offsetY = event.pageY - cardCenterY;
        const rotateXValue =
            offsetY > 0
                ? (-offsetY / cardCenterY) * 20
                : (-offsetY / cardCenterY) * 20;
        const rotateYValue = (offsetX / cardCenterX) * 40;

        mouseX.set(offsetX);
        mouseY.set(offsetY);
        rotateX.set(rotateXValue);
        rotateY.set(rotateYValue);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        rotateX.set(0);
        rotateY.set(0);
    };

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const shadowX = useTransform(rotateY, [-10, 10], [-25, 25]);
    const shadowY = useTransform(rotateX, [-10, 10], [-25, 25]);
    const shadowBlur = useTransform(rotateX, [-10, 10], [10, 30]);

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
                <motion.div className="card-info absolute bottom-4 left-4 text-white">
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
