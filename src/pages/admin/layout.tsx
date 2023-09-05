import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex">
            <div className="flex flex-col">
                <h2 className="text-5xl">Sidebar</h2>
                <Link href="/admin/users">Users</Link>
                <Link href="/admin/services">Services</Link>
            </div>
            {children}
        </div>
    );
}
