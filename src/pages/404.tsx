import Link from "next/link";
import { motion } from "framer-motion";



export default function Custom404() {




    return (
    
    <div className="w-2/3 text-white">



    
    
    
    <h1>404 - Page Not poggers</h1>
    
    
    <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className=" rounded-3xl bg-blue-200 px-6 py-2 text-3xl shadow-md "
>
    <Link href="/">Home</Link>
</motion.button>
    
    </div>
    
    );
}
