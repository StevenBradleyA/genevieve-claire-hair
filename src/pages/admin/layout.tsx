import Link from "next/link";
import { useState, type ReactNode } from "react";
import Image from "next/image";
import left from "../../../public/svgs/chevron-left-solid.svg";

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
                className="relative flex flex-col items-center rounded-3xl bg-glass p-10 shadow-xl"
                onClick={toggleSidebar}
            >
                <div className="absolute left-5 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <Image
                        alt="menu-minimize"
                        src={left}
                        width={20}
                        height={20}
                    />
                </div>
                <h2 className="text-5xl">Sidebar</h2>
                <Link href="/admin/users">Users</Link>
                <Link href="/admin/services">Services</Link>
                <Link href="/admin/bookings">Bookings</Link>
            </div>
        </div>
    );
}
