import React from 'react'
import styles from "./styles.module.css"

type Type = "Hata" | "Bilgi";
interface IInfoPage {
    Message: string
    Type: Type
}

function InfoPage({ Message, Type }: IInfoPage) {

    return (
        <>
            <div className={`${styles.ErrorContainer}  d-flex justify-content-center  text-center`}>
                <div className='d-flex align-items-center'>
                    <h1 className='display-6'><span className='text-danger'>{Type}:</span> {Message}</h1>
                </div>
            </div>
        </>
    )
}

export default InfoPage