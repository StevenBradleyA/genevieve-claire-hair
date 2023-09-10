import type { User } from "@prisma/client";
import Link from "next/link";

interface EachClientCardProps {
    user: User;
    i: number;
}

export default function EachClientCard({ user }: EachClientCardProps) {
    return (
        <div className="flex">
            <Link
                href={`/admin/users/${user.id}`}
                className="mb-5 flex rounded-2xl bg-glass px-6 py-2 text-white shadow-md"
            >
                {user.firstName} {user.lastName}
            </Link>
        </div>
    );
}
