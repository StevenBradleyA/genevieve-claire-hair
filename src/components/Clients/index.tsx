import type { User } from "@prisma/client";

export default function EachClientCard({user}: {user:User}) {
    return (
        <div className="flex">

            <button className="rounded-2xl bg-glass text-white shadow-md mb-5 px-6 py-2">{user.name}</button>
        </div>
    );
}
