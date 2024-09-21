"use client"
import styles from '@/components/Modal/modal.module.scss';
import { ButtonComponent } from '../ButtonComponent';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    typeButton1: "create" | "cancel" | "delete";
    typeButton2: "create" | "cancel" | "delete";
    textButton1: string;
    textButton2: string;
    onClick: () => void;
}

export function Modal({children, onClose, typeButton1, typeButton2, textButton1, textButton2, onClick}: ModalProps) {
    return(
        <div className={styles.modalOverlay}>
            <div className={styles.modalWrapper}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <p>Nova tarefa</p>
                    </div>
                    <div className={styles.modalBody}>
                        {children}
                    </div>
                    <div className={styles.modalFooter}>
                        <ButtonComponent text={textButton1} type={typeButton1} onClick={onClose} />
                        <ButtonComponent text={textButton2} type={typeButton2} onClick={onClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}