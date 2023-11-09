import Image from "next/image";
import { useState } from "react";
import { DotLoader } from "react-spinners";
import { api } from "~/utils/api";
import ModalDialog from "~/components/Modal";
import EditUser from "./updateUser";
import ClientBookings from "./ClientBookings";
import { motion } from "framer-motion";
import AdminCreateBooking from "../Bookings/AdminCreate";
import { displaySvg } from "../Svgs";

export default function ClientDetails({ userId }: { userId: string }) {
    const { data: user, isLoading } = api.user.getUserById.useQuery(userId);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isBookingModalOpen, setIsBookingModalOpen] =
        useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const openBookingModal = () => {
        setIsBookingModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
    };

    if (isLoading)
        return (
            <div className="mt-10 flex flex-col items-center justify-center gap-16">
                <div className="text-lg text-white">Loading User</div>{" "}
                <DotLoader size={50} color={"#ffffff"} loading={isLoading} />
            </div>
        );

    if (!user) return <div>Oops</div>;

    return (
        <div className="flex w-full flex-col items-center rounded-2xl bg-glass p-10 text-5xl text-white shadow-2xl ">
            <div className=" mb-5 flex gap-5 text-6xl  font-bold">
                <div>{user.firstName}</div>
                <div>{user.lastName}</div>
            </div>
            {user.images && user.images.length > 0 && (
                <div className="mb-5 flex items-center justify-center gap-5">
                    {user.images.map((e, i) => (
                        <div key={i}>
                            <Image
                                src={e.link}
                                alt="client"
                                width={200}
                                height={200}
                                className="w-40 "
                            />
                        </div>
                    ))}
                </div>
            )}
            <div className=" mt-3 text-2xl bg-darkGlass px-6 py-2 rounded-2xl ">{user.email}</div>
            {user.phoneNumber !== null && (
                <div className=" mt-3 text-2xl bg-darkGlass px-6 py-2 rounded-2xl">{user.phoneNumber}</div>
            )}

            <div className="mt-5 flex gap-5 ">
                Notes
                <motion.button
                    onClick={openModal}
                    className="rounded-2xl bg-glass p-2 px-3 text-3xl shadow-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {displaySvg("adminEdit")}
                </motion.button>
                {user && (
                    <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                        <EditUser
                            closeModal={closeModal}
                            user={user}
                            isLoading={isLoading}
                        />
                    </ModalDialog>
                )}
            </div>
            <div className=" mt-3 w-full rounded-2xl bg-darkGlass p-6">
                {user.notes &&
                    user.notes.split("\n").map((line, index) => (
                        <p key={index} className="text-xl">
                            {line}
                        </p>
                    ))}
            </div>

            <div className="my-5 flex gap-5 ">Booking</div>
            <motion.button
                className="mb-10 rounded-3xl bg-darkGlass px-6 py-2 text-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={openBookingModal}
            >
                Book an Appointment
            </motion.button>
            <ModalDialog
                isOpen={isBookingModalOpen}
                onClose={closeBookingModal}
            >
                <AdminCreateBooking
                    userId={user.id}
                    firstName={user.firstName || ""}
                    lastName={user.lastName || ""}
                    user={user}
                />
            </ModalDialog>

            {userId && <ClientBookings userId={userId} />}
        </div>
    );
}
