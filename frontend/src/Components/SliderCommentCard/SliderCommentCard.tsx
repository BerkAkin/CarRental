import React from 'react'
import styles from './styles.module.css'

interface CommentCardProps {
    Comment: string;
    StarCount: number | string;
    Person: string;
    Type: string;
}
function SliderCommentCard({ Comment, StarCount, Person, Type }: CommentCardProps) {
    return (
        <>
            <div className='col'>
                <div className={`${styles.cardBg} d-flex justify-content-between flex-column rounded`}>
                    <div className='text-start p-4'>
                        <p>{Comment}</p>
                    </div>
                    <div className='ps-4 pb-3'>
                        <section className='fs-6'>{StarCount}</section>
                        <section className={styles.textFeatures}>{Person}</section>
                        <section className={styles.textColor}>{Type}</section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SliderCommentCard