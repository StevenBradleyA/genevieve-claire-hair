import { useSession } from "next-auth/react";
import { useState } from "react";
import UpdateReview from "../Update";
import DeleteReview from "../Delete";
import type { ReviewWithUser } from ".";
import ModalDialog from "~/components/Modal";
import { api } from "~/utils/api";
import ReviewCarousel from "./carousel";
import type { Images } from "@prisma/client";
import { useMobile } from "~/components/MobileContext";

interface HoveredArea {
    top: string;
    right: number;
    bottom: number;
    left: string;
}

export default function ReviewCard({ review }: { review: ReviewWithUser }) {
    const { data: session } = useSession();
    const { isMobile } = useMobile();

    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [cardClick, setCardClick] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [hoveredArea, setHoveredArea] = useState<HoveredArea | null>(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCardClick = () => {
        setCardClick(!cardClick);
    };

    const { data: images, isLoading } = api.image.getAllByResourceId.useQuery({
        resourceType: "REVIEW",
        resourceId: review.id,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } =
            e.currentTarget.getBoundingClientRect();
        const { clientX, clientY } = e;

        const xOffset = -(clientX - left - width / 2) / 20;
        const yOffset = -(clientY - top - height / 2) / 10;

        const sideTilt = {
            top: yOffset.toFixed(2),
            right: -xOffset.toFixed(2),
            bottom: -yOffset.toFixed(2),
            left: xOffset.toFixed(2),
        };

        setHoveredArea(sideTilt);
    };

    const handleMouseLeave = () => {
        setHoveredArea(null);
    };
    if (isLoading)
        return <div className="text-white">Loading All Review Images...</div>;

    return isMobile ? (
        <div className="my-10">
            <div
                className="h-[220px] w-[350px] rounded-2xl bg-glass text-white shadow-2xl"
                onClick={handleCardClick}
            >
                {cardClick && images && images.length > 0 ? (
                    <div className="flex justify-center pt-1">
                        {images.map((image: Images, i: number) => {
                            return (
                                <ReviewCarousel
                                    key={i}
                                    image={image}
                                    totalImages={images.length}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="p-4">
                        <div className="mb-2 flex items-center gap-5">
                            <div className=" flex h-12 w-14 items-center justify-center rounded-full bg-lightPurple text-4xl">
                                {review.user.name ? review.user.name[0] : null}
                            </div>
                            <div className="flex w-72 items-center justify-between">
                                <div className="flex flex-col">
                                    <div className="text-2xl font-semibold">
                                        {review.user.name}
                                    </div>
                                    <div className="text-image flex gap-1">
                                        {Array(review.starRating).fill("⭐️")}
                                    </div>
                                </div>
                                {images && images.length > 0 && (
                                    <h1 className="font-grand-hotel text-4xl ">
                                        Click me
                                    </h1>
                                )}
                            </div>
                        </div>
                        <div className="h-32 overflow-y-auto break-words">
                            <p className="bg-gradient-to-r from-violet-300 via-indigo-300 to-pink-300 bg-clip-text text-transparent">
                                {review.text}{" "}
                                {`holy ; asfjkl; djkl; l; as even longer aslkdfj al;ksdfj lsjkal; djkl ;fjkl; jkl; asdjk;l fjkl; ljk asdlj kfl jkasdjkl fjkl asdjkl; asdfjkl adfjkl sajkl sdfjkl dasl jk a fjkl asdf jkl adfs jkl dasf jkl dfs jkl dsf jkl sdfajkl dfas jkl asdf jkl dfas jkl asdf jkl asdf jkl; sadf jkl asdf jkl sadf jkl; asdf jkl adjkl adfjkl asdf jl kasdf jkl a dfsjkl a dfslajl sdfjkal jkl; dfjkl asdf ljkl sdf jkl  sdfjkl asdf jkl asdfjkldfjkl;s  jkl; f ajkl dsafjkl  asdfjkl  fdsjkl; asdf jkl asdf jkl asdf jkl asdf jkl dfas jkl; asdf jkl asdf jkl df asjkl asdf jkl df asjkl asdf jkl adf sjkl adfs jl asdf jkl adfs jkl df jkl dfs ajkl dfas jkl asdf jlk df sjkl sdfa jkl asdf jkl asdf jkl df jkl sdf ajkl asdf jkl; asdf ;kasdj f;lkjas;ldkf j;laksjd fl;kasjdkl; fjkl; asdjkl; fkl jsfadjkl; l;dfsajkldfjkl; sajkl; asdfjkl; ;jl f; jasfdjkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jl;k jkl; jkl; jkl; jkl; jkl; lj k;lj; ljk; jkl ljk jkl jkl; jkl jkl jkl jkl jkl jkl jkl  jkl jkljkl jkl; jkl jkl ;jkl; jkl; asdlflljkajkls; djkl;f jkl; asdjkl; fjkl; asdlfk;j asl;kdfjlkasjdfl;kjsadlkfjlsdjfljweoiruwoeiru oweiru weoiru oweiur oiweu roweiu roiwue roiwueoriuw eoiruwoeiru woeiru weoiru df;asdfl;j jl; that was soooo werid wtd skadfl;jkfasld; j;asfdjl; ksfjkl; dajl; asdfjl;jfkjkl; big poggies woggy als;kdjf al;skdjf lkasjdf ;kljas dfl;kjas dl;fkj asl;dkfj l; jsda asdfjkl; fjkl; asdjkl; asdfjl; kasdfj ;jf`}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {session && session.user.id === review.userId && (
                <div className="flex justify-center gap-5">
                    <div>
                        <button
                            onClick={openModal}
                            className="justify-centerp-3 flex transform rounded-xl bg-glass px-4  py-2 text-violet-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                        >
                            Edit Review
                        </button>
                        <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                            <UpdateReview
                                review={review}
                                session={session}
                                closeModal={closeModal}
                            />
                        </ModalDialog>
                    </div>

                    <DeleteReview
                        id={review.id}
                        session={session}
                        showDelete={showDelete}
                        setShowDelete={setShowDelete}
                        images={images || []}
                    />
                </div>
            )}
        </div>
    ) : (
        <div>
            <div
                className="card-poggers text-white"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleCardClick}
            >
                <div
                    className="card"
                    style={{
                        transform: `
        rotateX(${hoveredArea?.top || 0}deg)
        rotateY(${hoveredArea?.right || 0}deg)
        translateX(${hoveredArea?.left || 0}px)
        translateY(${hoveredArea?.bottom || 0}px)
      `,
                    }}
                >
                    {cardClick && images && images.length > 0 ? (
                        <div className="flex justify-center pt-1">
                            {images.map((image: Images, i: number) => {
                                return (
                                    <ReviewCarousel
                                        key={i}
                                        image={image}
                                        totalImages={images.length}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-4">
                            <div className="mb-2 flex items-center gap-5">
                                <div className=" flex h-14 w-14 items-center justify-center rounded-full bg-lightPurple text-4xl">
                                    {review.user.name
                                        ? review.user.name[0]
                                        : null}
                                </div>
                                <div className="flex w-72 items-center justify-between">
                                    <div className="flex flex-col">
                                        <div className="text-2xl font-semibold">
                                            {review.user.name}
                                        </div>
                                        <div className="text-image flex gap-1">
                                            {Array(review.starRating).fill(
                                                "⭐️"
                                            )}
                                        </div>
                                    </div>
                                    {images && images.length > 0 && (
                                        <div className=" click-me-dropdown ">
                                            <p className="bg-gradient-to-r from-violet-300 via-indigo-300 to-pink-300 bg-clip-text text-transparent">
                                                View Images
                                            </p>
                                            <h1 className="font-grand-hotel text-4xl ">
                                                Click me
                                            </h1>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="h-32 overflow-y-auto break-words">
                                <p className="bg-gradient-to-r from-violet-300 via-indigo-300 to-pink-300 bg-clip-text text-transparent">
                                    {review.text}{" "}
                                    {`holy ; asfjkl; djkl; l; as even longer aslkdfj al;ksdfj lsjkal; djkl ;fjkl; jkl; asdjk;l fjkl; ljk asdlj kfl jkasdjkl fjkl asdjkl; asdfjkl adfjkl sajkl sdfjkl dasl jk a fjkl asdf jkl adfs jkl dasf jkl dfs jkl dsf jkl sdfajkl dfas jkl asdf jkl dfas jkl asdf jkl asdf jkl; sadf jkl asdf jkl sadf jkl; asdf jkl adjkl adfjkl asdf jl kasdf jkl a dfsjkl a dfslajl sdfjkal jkl; dfjkl asdf ljkl sdf jkl  sdfjkl asdf jkl asdfjkldfjkl;s  jkl; f ajkl dsafjkl  asdfjkl  fdsjkl; asdf jkl asdf jkl asdf jkl asdf jkl dfas jkl; asdf jkl asdf jkl df asjkl asdf jkl df asjkl asdf jkl adf sjkl adfs jl asdf jkl adfs jkl df jkl dfs ajkl dfas jkl asdf jlk df sjkl sdfa jkl asdf jkl asdf jkl df jkl sdf ajkl asdf jkl; asdf ;kasdj f;lkjas;ldkf j;laksjd fl;kasjdkl; fjkl; asdjkl; fkl jsfadjkl; l;dfsajkldfjkl; sajkl; asdfjkl; ;jl f; jasfdjkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jkl; jl;k jkl; jkl; jkl; jkl; jkl; lj k;lj; ljk; jkl ljk jkl jkl; jkl jkl jkl jkl jkl jkl jkl  jkl jkljkl jkl; jkl jkl ;jkl; jkl; asdlflljkajkls; djkl;f jkl; asdjkl; fjkl; asdlfk;j asl;kdfjlkasjdfl;kjsadlkfjlsdjfljweoiruwoeiru oweiru weoiru oweiur oiweu roweiu roiwue roiwueoriuw eoiruwoeiru woeiru weoiru df;asdfl;j jl; that was soooo werid wtd skadfl;jkfasld; j;asfdjl; ksfjkl; dajl; asdfjl;jfkjkl; big poggies woggy als;kdjf al;skdjf lkasjdf ;kljas dfl;kjas dl;fkj asl;dkfj l; jsda asdfjkl; fjkl; asdjkl; asdfjl; kasdfj ;jf`}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {session && session.user.id === review.userId && (
                <div className="flex justify-center gap-5">
                    <div>
                        <button
                            onClick={openModal}
                            className="justify-centerp-3 flex transform rounded-xl bg-glass px-4  py-2 text-violet-300 shadow-md transition-transform hover:scale-105 active:scale-95"
                        >
                            Edit Review
                        </button>
                        <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                            <UpdateReview
                                review={review}
                                session={session}
                                closeModal={closeModal}
                            />
                        </ModalDialog>
                    </div>

                    <DeleteReview
                        id={review.id}
                        session={session}
                        showDelete={showDelete}
                        setShowDelete={setShowDelete}
                        images={images || []}
                    />
                </div>
            )}
        </div>
    );
}
