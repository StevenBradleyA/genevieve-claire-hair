import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="grid w-full grid-cols-12 gap-2">
            <div className="col-span-3 flex flex-col items-center">
                <h2 className="text-5xl">Sidebar</h2>
                <Link href="/admin/users">Users</Link>
                <Link href="/admin/services">Services</Link>
                <Link href="/admin/bookings">Bookings</Link>
            </div>
            <div className="col-span-8 flex w-full flex-col items-center gap-5">
                {children}
            </div>
        </div>
    );
}
