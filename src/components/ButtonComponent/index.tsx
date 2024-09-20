"use client"
import styles from '@/components/ButtonComponent/button.module.scss'

interface ButtonComponentProps {
    onClick: () => void;
    text: string;
    type: "cancel" | "delete" | "create";
    width?: string;
}

export function ButtonComponent({onClick, text, type, width}: ButtonComponentProps) {
    return(
        <button onClick={onClick} className={type === "create" ? styles.buttonCreate : (type === "cancel" ? styles.buttonCancel : styles.buttonDelete)} style={{width: width ? width : "100%"}}>
            {text}
        </button>
    )
}