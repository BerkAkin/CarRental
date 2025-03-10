import React, { useState } from 'react'
import styles from "./styles.module.css"
import Image from '../Image/Image';

interface ToastMessageProps {
    Message: string;
    Type: string;
}

function ToastMessage({ Message, Type }: ToastMessageProps) {


    const TMType = {
        '--TMBgColor': Type === "w" ? "#ffc107" : Type === "s" ? "#d0fcc3" : "#fcc3c3",
    } as React.CSSProperties;

    const TMIcon = {
        '--TMIBgColor': Type === "d" ? "#dd6b6b" : Type === "s" ? "#85dd6b" : "yellow",
    } as React.CSSProperties

    return (
        <>
            <div className={`${styles.toastContainer} w-100`} >
                <div className='container-fluid h-100'>
                    <div className='row  h-100'>
                        <div className='col-9'></div>
                        <div className='col-3'>
                            <div className={`${styles.toastInnerContainer} row h-100`}>
                                <div style={TMIcon} className={`${styles.toastIcon} border-ends col-2 d-flex align-items-center justify-content-center`}>
                                    <Image URL={process.env.REACT_APP_STATIC_IMAGE + "favicon.png"} Width='40' />
                                </div>
                                <div style={TMType} className={`${styles.toastBg} col-10 d-flex align-items-center justify-content-center`}>
                                    <span> {Message}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToastMessage