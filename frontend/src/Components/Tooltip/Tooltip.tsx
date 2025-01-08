import React from 'react'
import styles from './styles.module.css';

interface ITooltip {
    Text: string;
    isVisible: boolean
}

function Tooltip({ Text, isVisible }: ITooltip) {
    return (
        <>
            <span className={`${styles.tooltipContainer} ${isVisible ? styles.visible : ''}`}>
                {Text}
            </span>
        </>
    )
}

export default Tooltip