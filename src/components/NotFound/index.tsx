import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {




    return (
        <>
            <div className="flex flex-col items-center justify-center rounded-3xl bg-glass p-10 text-5xl text-white shadow-xl ">
                <div className="mb-10">Uh oh! Looks like you got Lost </div>
                <div className="mb-10">Go back to the homepage </div>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className=" rounded-3xl bg-blue-200 px-6 py-2 text-3xl shadow-md "
                >
                    <Link href="/">Home</Link>
                </motion.button>
            </div>
        </>
    );
}
