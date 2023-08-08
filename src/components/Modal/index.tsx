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
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 50 }}
            >
                <motion.div
                    className="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOpen ? 1 : 0 }}
                ></motion.div>
                <div>
                    {children}
                    <button onClick={handleClose}>Close</button>
                </div>
            </motion.dialog>
        );
    }

    return null;
};

export default ModalDialog;
