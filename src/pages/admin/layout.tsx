import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        // <div className="flex">
        //     <div className="flex flex-col">
        //         <h2 className="text-5xl">Sidebar</h2>
        //         <Link href="/admin/users">Users</Link>
        //         <Link href="/admin/services">Services</Link>
        //     </div>
        //     {children}
        // </div>
        <div className="grid grid-cols-10">
            <div className="col-span-1"></div>
            <div className="col-span-1 flex flex-col items-center">
                <h2 className="text-5xl">Sidebar</h2>
                <Link href="/admin/users">Users</Link>
                <Link href="/admin/services">Services</Link>
            </div>
            <div className="col-span-7 flex justify-center">{children}</div>
            <div className="col-span-1"></div>
        </div>
    );
}
