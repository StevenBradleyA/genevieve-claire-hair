import type { User } from "@prisma/client";
import Link from "next/link";

interface EachClientCardProps {
    user: User;
    i: number;
}

export default function EachClientCard({ user, i }: EachClientCardProps) {
    console.log("hey", i);
    return (
        <div className="flex">
            <Link
                href={`/admin/${user.id}`}
                className=" flex mb-5 rounded-2xl bg-glass px-6 py-2 text-white shadow-md"
            >
                {user.firstName} {user.lastName}
            </Link>
        </div>
    );
}
