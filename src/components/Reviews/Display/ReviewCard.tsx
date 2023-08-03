import { useSession } from "next-auth/react";
import { useState } from "react";
import UpdateReview from "../Update";
import DeleteReview from "../Delete";
import type { ReviewWithUser } from ".";
import { motion, useMotionValue, useTransform } from "framer-motion";
import reviewBackgroundImage from "../../../../public/Holographic/holo-swirl.png";
import Image from "next/image";

// new rect
export default function ReviewCard({ review }: { review: ReviewWithUser }) {
    const { data: session } = useSession();
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event: MouseEvent) => {
        mouseX.set(event.pageX - window.innerWidth / 2);
        mouseY.set(event.pageY - window.innerHeight / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

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
                    rotateX: useTransform(mouseY, [-100, 100], [10, -10]),
                    rotateY: useTransform(mouseX, [-100, 100], [-10, 10]),
                    boxShadow: useTransform(
                        mouseX,
                        [-100, 100],
                        [
                            "rgba(0, 0, 0, 0.2) 0px 20px 40px -10px",
                            "rgba(0, 0, 0, 0.5) 0px 30px 60px -20px",
                        ]
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
