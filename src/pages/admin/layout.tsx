import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-1"></div>
            <div className="col-span-1 flex flex-col items-center">
                <h2 className="text-5xl">Sidebar</h2>
                <Link href="/admin/users">Users</Link>
                <Link href="/admin/services">Services</Link>
                <Link href="/admin/bookings">Bookings</Link>
            </div>
            <div className="col-span-9 flex flex-col items-center gap-5">
                {children}
            </div>
            <div className="col-span-1"></div>
        </div>
    );
}
