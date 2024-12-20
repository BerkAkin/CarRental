import React from 'react'
import styles from './styles.module.css'

interface CommentCardProps {
    Content: string;
    StarCount: number;
    Username: string;
    UserType: string;
}
function SliderCommentCard({ Content, StarCount, Username, UserType }: CommentCardProps) {
    return (
        <>
            <div className='col'>
                <div className={`${styles.cardBg} d-flex justify-content-between flex-column`}>
                    <div className='text-start p-4'>
                        <p>{Content}</p>
                    </div>
                    <div className='ps-4 pb-3'>
                        <section className='fs-6'>{'★'.repeat(StarCount)}</section>
                        <section className={styles.textFeatures}>{Username}</section>
                        <section className={styles.textColor}>{UserType}</section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SliderCommentCard