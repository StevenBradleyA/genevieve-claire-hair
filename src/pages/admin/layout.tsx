import Link from "next/link";
import { useState, type ReactNode } from "react";
import Image from "next/image";
import giraffe from "@public/giraffe.png";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        // <div className="grid w-full grid-cols-12 gap-2">
        <div className=" flex w-full justify-between">
            <div className=" flex w-full flex-col items-center">{children}</div>

            <div
                className={`relative  mt-5 flex h-[35rem] flex-col items-center rounded-l-3xl bg-glass  shadow-xl ${
                    isSidebarOpen ? "p-10" : "p-5"
                }`}
            >
                {isSidebarOpen ? (
                    <div className="ml-3 flex flex-col gap-5 text-2xl text-white">
                        <Link href="/admin">
                            <Image
                                src={giraffe}
                                alt="giraffe"
                                width={giraffe.width}
                                height={giraffe.height}
                                className="mb-5 w-28 transform object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                        </Link>
                        <Link
                            href="/admin/users"
                            className="flex justify-center rounded-2xl bg-glass px-4 py-2 shadow-md"
                        >
                            Clients
                        </Link>
                        <Link
                            href="/admin/services"
                            className="flex justify-center rounded-2xl bg-glass px-4 py-2 shadow-md"
                        >
                            Services
                        </Link>
                        <Link
                            href="/admin/bookings"
                            className="flex justify-center rounded-2xl bg-glass px-4 py-2 shadow-md"
                        >
                            Bookings
                        </Link>
                        <div
                            className="svg-container absolute left-5 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-white"
                            onClick={toggleSidebar}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 320 512"
                                className="your-custom-class"
                            >
                                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <div
                        className="svg-container absolute left-5 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer"
                        onClick={toggleSidebar}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 320 512"
                        >
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
}
