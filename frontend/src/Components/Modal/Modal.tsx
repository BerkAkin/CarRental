import React from 'react'
import styles from './styles.module.css';

interface modalProps {
    closeModal: () => void;
    children: React.ReactNode;
}

function Modal({ closeModal, children }: modalProps) {

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }


    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            {children}
        </div>
    )
}

export default Modal