import React from 'react'
import styles from './styles.module.css'

interface SliderCardProps {
    Comment: string;
    StarCount: number | string;
    Person: string;
    Type: string;
}
function SliderCard({ Comment, StarCount, Person, Type }: SliderCardProps) {
    return (
        <>
            <div className='col'>
                <div className={`${styles.cardBg} h-100 d-flex flex-column rounded`}>
                    <div className='h-75 text-start p-4 '>
                        <p>{Comment}</p>
                    </div>
                    <div className='ps-4 mb-3'>
                        <section className='fs-6'>{StarCount}</section>
                        <section className={styles.textFeatures}>{Person}</section>
                        <section className={styles.textColor}>{Type}</section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SliderCard