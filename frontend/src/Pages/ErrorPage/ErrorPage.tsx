import React from 'react'
import styles from "./styles.module.css"

interface IErrorPage {
    ErrorMessage: string
}

function ErrorPage({ ErrorMessage }: IErrorPage) {

    return (
        <>
            <div className={`${styles.ErrorContainer}  d-flex justify-content-center  text-center`}>
                <div className='d-flex align-items-center'>
                    <h1 className='display-6'><span className='text-danger'>Hata:</span> {ErrorMessage}</h1>
                </div>
            </div>
        </>
    )
}

export default ErrorPage