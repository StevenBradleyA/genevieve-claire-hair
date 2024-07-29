import { useState, type ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import AdminLayout from "./layout";
import { useSession } from "next-auth/react";
import { displaySvg } from "~/components/Svgs";
import Custom404 from "../404";
import Image from "next/image";
import logo from "@public/icons/heart.png";
import { motion } from "framer-motion";
import ModalDialog from "~/components/Modal";
import EditUserNotes from "~/components/Clients/updateNotes";
import Footer from "~/components/Footer/footer";

const AdminPage: NextPageWithLayout = () => {
    const { data: session } = useSession();

    const accessDenied = !session || !session.user.isAdmin;

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (accessDenied) {
        return <Custom404 />;
    }

    return (
        <>
            <div className="flex w-2/3 flex-col items-center text-2xl text-white ">
                <h1 className="font-archivo text-8xl">ADMIN</h1>
                {session && session.user && (
                    <div className="mt-10 w-full rounded-2xl bg-glass p-10 shadow-lg">
                        <div className="relative flex w-full justify-center">
                            <div className=" bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-purple-300 bg-clip-text text-3xl text-transparent ">
                                {session.user.firstName} notes
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute right-0 "
                                onClick={openModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-purple-300"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M9.00024 10.5001V15.0001M9.00024 15.0001H13.5002M9.00024 15.0001L15.0002 9M7.20024 20H16.8002C17.9203 20 18.4804 20 18.9082 19.782C19.2845 19.5903 19.5905 19.2843 19.7823 18.908C20.0002 18.4802 20.0002 17.9201 20.0002 16.8V7.2C20.0002 6.0799 20.0002 5.51984 19.7823 5.09202C19.5905 4.71569 19.2845 4.40973 18.9082 4.21799C18.4804 4 17.9203 4 16.8002 4H7.20024C6.08014 4 5.52009 4 5.09226 4.21799C4.71594 4.40973 4.40998 4.71569 4.21823 5.09202C4.00024 5.51984 4.00024 6.07989 4.00024 7.2V16.8C4.00024 17.9201 4.00024 18.4802 4.21823 18.908C4.40998 19.2843 4.71594 19.5903 5.09226 19.782C5.52009 20 6.08014 20 7.20024 20Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </motion.button>
                        </div>
                        <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                            <EditUserNotes closeModal={closeModal} />
                        </ModalDialog>

                        <div className="mt-1 w-full rounded-2xl bg-darkGlass p-6 text-xl">
                            {session.user.notes &&
                                session.user.notes
                                    .split("\n")
                                    .map((line, index) => (
                                        <p key={index}>{line}</p>
                                    ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

AdminPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <AdminLayout>{page}</AdminLayout>;
            <div className="mt-60 w-full">
                <Footer />
            </div>
        </>
    );
};

export default AdminPage;
