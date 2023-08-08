import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";

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

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (isOpen && event.target instanceof HTMLDialogElement) {
                handleClose();
            }
        };

        window.addEventListener("click", handleOutsideClick);

        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, [isOpen, handleClose]);

    if (isOpen) {
        return (
            <motion.dialog
                className="fixed inset-0 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="rounded bg-white p-4 shadow-lg">
                    {children}
                    <button
                        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </motion.dialog>
        );
    }

    return null;
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
