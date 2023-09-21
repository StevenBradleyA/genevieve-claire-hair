import type { User } from "@prisma/client";
import { motion } from "framer-motion";
import Link from "next/link";

interface EachClientCardProps {
    user: User;
    i: number;
}

export default function EachClientCard({ user }: EachClientCardProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex"
        >
            <Link
                href={`/admin/users/${user.id}`}
                className="mb-5 flex rounded-2xl bg-glass px-6 py-2 text-white shadow-md"
            >
                {user.firstName} {user.lastName}
            </Link>
        </motion.button>
    );
}
