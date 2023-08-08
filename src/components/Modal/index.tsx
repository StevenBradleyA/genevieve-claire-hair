import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalDialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

// close now working

const ModalDialog: React.FC<ModalDialogProps> = ({
    isOpen,
    onClose,
    children,
}) => {
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleBackgroundClick = () => {
        handleClose();
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (isOpen && event.target instanceof HTMLDialogElement) {
                handleClose();
            }
        };

        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, handleClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <motion.div
                        className="fixed inset-0 bg-gray-800 bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={handleBackgroundClick}
                    />
                    <div className="relative rounded bg-white p-4 shadow-lg">
                        {children}
                        <button
                            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalDialog;

// return (
//     <motion.dialog
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 50 }}
//     >
//         <motion.div
//             className="overlay"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: isOpen ? 1 : 0 }}
//         ></motion.div>
//         <div>
//             {children}
//             <button onClick={handleClose}>Close</button>
//         </div>
//     </motion.dialog>
// );
