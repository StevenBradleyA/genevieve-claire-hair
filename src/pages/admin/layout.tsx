import Link from "next/link";
import { useState, type ReactNode } from "react";
import Image from "next/image";
import giraffe from "@public/giraffe.png";
import { motion } from "framer-motion";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const variants = {
        visible: (i: number) => ({
            opacity: 1,
            transition: {
                opacity: { duration: 0.5, delay: 0.12 * i },
            },
        }),
        hidden: { opacity: 0 },
    };

    return (
        <div className=" flex w-full justify-between ">
            <div className=" flex w-full flex-col items-center">{children}</div>

            <motion.div
                className={` sticky top-40  mt-5 flex h-[35rem] flex-col items-center overflow-x-hidden rounded-l-3xl  bg-glass p-8 shadow-xl`}
                initial={{ width: "5rem" }}
                animate={{ width: isSidebarOpen ? "15rem" : "0rem" }}
                exit={{ width: "0rem" }}
                transition={{
                    duration: 0.5,
                    ease: "linear",
                }}
            >
                {isSidebarOpen && (
                    <div className="ml-3 flex flex-col gap-5 text-2xl text-white">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            variants={variants}
                            custom={5}
                            initial="hidden"
                            animate="visible"
                            // transition={{ delay: 0.5, duration: 0.3 }}
                        >
                            <Link href="/admin">
                                <Image
                                    src={giraffe}
                                    alt="giraffe"
                                    width={giraffe.width}
                                    height={giraffe.height}
                                    className="mb-5 w-28 transform object-cover "
                                />
                            </Link>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            custom={4}
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Link
                                href="/admin/users"
                                className="flex justify-center rounded-2xl bg-glass px-4 py-2 shadow-md"
                            >
                                Clients
                            </Link>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            custom={3}
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Link
                                href="/admin/services"
                                className="flex justify-center rounded-2xl bg-glass px-4 py-2 shadow-md"
                            >
                                Services
                            </Link>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            custom={2}
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Link
                                href="/admin/bookings"
                                className="flex justify-center rounded-2xl bg-glass px-4 py-2 shadow-md"
                            >
                                Bookings
                            </Link>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            custom={1}
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Link
                                href="/admin/time-off"
                                className="flex justify-center rounded-2xl bg-glass px-4 py-2 shadow-md"
                            >
                                Time Off
                            </Link>
                        </motion.button>
                    </div>
                )}
                <motion.div
                    className="svg-container absolute left-2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
                    onClick={toggleSidebar}
                    animate={{ rotate: isSidebarOpen ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 320 512"
                    >
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
}
