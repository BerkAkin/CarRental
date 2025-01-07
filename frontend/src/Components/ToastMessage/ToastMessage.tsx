import React, { useState } from 'react'
import styles from "./styles.module.css"

interface ToastMessageProps {
    Message: string;
    Type: string;
}

function ToastMessage({ Message, Type }: ToastMessageProps) {


    const TMType = {
        '--TMBgColor': Type === "w" ? "#ffc107" : Type === "s" ? "#3f7c2c" : "#b30000",
        '--TMColor': Type === "d" ? "white" : Type === "s" ? "white" : "black",
    } as React.CSSProperties;

    return (
        <>
            <div className={`${styles.toastContainer} w-100`} >
                <div className='container'>
                    <button style={TMType} className={`${styles.toastBtn} w-100 px-4 pb-1 fs-5`}>
                        {Message}
                    </button>
                </div>
            </div>
        </>
    )
}

export default ToastMessage