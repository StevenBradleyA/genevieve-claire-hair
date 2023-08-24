import type { User } from "@prisma/client";

export default function EachClientCard({user}: {user:User}) {
    return (
        <div className="flex flex-col gap-5 bg-glass text-white shadow-2xl">
        <button>{user.name}</button>
        </div>
    );
}
