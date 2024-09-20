"use client"

import Image from 'next/image';
import styles from './card.module.scss';
import { useState } from 'react';

interface CardProps {
    onClickDelete: () => void;
}

export function Card({onClickDelete}: CardProps) {
    
    const [checked, setChecked] = useState(false);
    
    return(
        <div className={styles.container}>
            <div className={styles.checkAndText}>
                <div className={checked ? styles.checkBoxChecked : styles.checkBox} onClick={() => setChecked(!checked)}>
                    {checked && <Image src="/assets/check.png" alt="Check" width={12} height={10} />}
                </div>
                <p className={checked ? styles.textChecked : styles.text}>Lavar as mãos</p>
            </div>
            <Image onClick={onClickDelete} src="/assets/icon-trash.png" alt="Check" width={18} height={20} />
        </div>
    )
}