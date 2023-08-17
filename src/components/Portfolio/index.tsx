import { motion } from "framer-motion";
import Image from "next/image";

const staggerVariants = {
    hidden: { opacity: 0 },
    visible: (index: number) => ({
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: index * 0.12,
        },
    }),
};

interface Post {
    id: string;
    media_url: string;
    caption: string;
}

export default function InstagramImageCard({ post }: { post: Post }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            // custom={index}
            variants={staggerVariants}
            className="insta-image-sizing w-full overflow-hidden"
        >
            <div className="zoom-effect h-full w-full rounded-lg object-cover">
                <Image
                    src={post.media_url}
                    alt={post.caption || ""}
                    width={300}
                    height={300}
                    className="h-full w-full"
                />
            </div>
        </motion.div>
    );
}
