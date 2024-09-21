"use client"

import Image from 'next/image';
import styles from './card.module.scss';
import { useState } from 'react';

interface CardProps {
    onClickDelete: () => void;
    name: string;
    completed: boolean;
    setCompleted: (val: boolean) => void;
}

export function Card({onClickDelete, name, completed, setCompleted}: CardProps) {
    
    
    return(
        <div className={styles.container}>
            <div className={styles.checkAndText}>
                <div className={completed ? styles.checkBoxChecked : styles.checkBox} onClick={() => {setCompleted(!completed)}}>
                    {completed && <Image src="/assets/check.png" alt="Check" width={12} height={10} />}
                </div>
                <p className={completed ? styles.textChecked : styles.text}>{name}</p>
            </div>
            <Image onClick={onClickDelete} src="/assets/icon-trash.png" alt="Check" width={18} height={20} />
        </div>
    )
}