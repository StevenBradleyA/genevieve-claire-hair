import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalDialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

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

    const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
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

    // TODO if a user has multiple reviews how will we know which review images to grab??
    // ? The resourceID? 

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onClick={handleBackgroundClick}
                >
                    <motion.div
                        className="fixed inset-0 bg-gray-800 bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="relative rounded-lg bg-gradient-to-br from-fuchsia-100 to-blue-200 p-10 shadow-lg"
                        initial={{ scale: 0.8, y: -20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.8, y: 20, opacity: 0 }}
                        transition={{
                            type: "spring",
                            damping: 15,
                            stiffness: 250,
                        }}
                        onClick={handleModalClick}
                    >
                        <button
                      className="absolute top-2 right-4 text-lg text-gray-600 hover:text-purple-500 transform transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-45"
                    onClick={handleClose}
                    >
                    &times; 
                    </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalDialog;
