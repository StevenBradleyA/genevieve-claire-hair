import { useSession } from "next-auth/react";
import { useState } from "react";
import UpdateReview from "../Update";
import DeleteReview from "../Delete";
import type { ReviewWithUser } from ".";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { MotionValue } from "framer-motion";
import ModalDialog from "~/components/Modal";
import { api } from "~/utils/api";
import ReviewCarousel from "./carousel";
import type { Images } from "@prisma/client";

export default function ReviewCard({ review }: { review: ReviewWithUser }) {
    const { data: session } = useSession();
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [cardClick, setCardClick] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

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

    // effect

    const [hoveredArea, setHoveredArea] = useState(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
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

  const handleMouseEnter = () => {
    // Handle mouse enter logic here
  };

  const handleMouseLeave = () => {
    setHoveredArea(null);
  };

  return (
    <div
      className="card-wrap"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        <div className="card-bg" style={{ backgroundColor: 'rgba(1,1,1,0.2)' }} />
        <div className="card-info">
          <h1>Title</h1>
          <p>Content goes here.</p>
        </div>
      </div>
    </div>
    );
}
