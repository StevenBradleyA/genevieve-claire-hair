import { useState } from "react";
import { DotLoader } from "react-spinners";
import { api } from "~/utils/api";
import type { User } from "@prisma/client";
import AdminCreateBooking from ".";

interface SelectUserProps {
    closeModal: () => void;
}

export default function AdminBookingSelectUser({
    closeModal,
}: SelectUserProps) {
    const [isUserSelected, setIsUserSelected] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const { data: users, isLoading } = api.user.getAllUsers.useQuery();

    if (isLoading)
        return (
            <div className=" mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Users are loading</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
            </div>
        );

    if (!users) return <div>Oops</div>;

    return (
        <div>
            {isUserSelected && selectedUser !== null ? (
                <AdminCreateBooking user={selectedUser} />
            ) : (
                <div className=" mb-20 flex flex-col justify-center rounded-2xl bg-glass p-20 text-2xl shadow-xl">
                    {users.map((user: User, i: number) => (
                        <button
                            className="mb-3 flex rounded-2xl bg-darkGlass px-6 py-2"
                            key={i}
                            onClick={() => {
                                setSelectedUser(user);
                                setIsUserSelected(true);
                            }}
                        >
                            {user.firstName} {user.lastName}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
