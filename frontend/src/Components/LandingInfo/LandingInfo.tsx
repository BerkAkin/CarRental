import React from 'react'
import Image from '../../Components/Image/Image'
import styles from './styles.module.css'
import ListElement from '../../Components/ListElement/ListElement';
import Skeleton from '../Skeletons/Skeleton/Skeleton';

interface landingInfoProps {
    Text: string[];
    isLoading: boolean;
}

function LandingInfo({ Text, isLoading }: landingInfoProps) {
    return (
        <div>
            <div className='container-fluid mt-3'>
                <div className='row'>
                    <div className={`col-xl-12 col-xxl-8`}>
                        <Image URL={"/static/landing.jpg"} Width="1230px" Height="690px" />
                    </div>
                    <div className='col-xxl-4 d-flex justify-content-center flex-column'>
                        <div className='row text-center my-4'>
                            {isLoading ? <h1 id={styles["landingText"]}><Skeleton /></h1> : <h1 id={styles["landingText"]}>Her şey dahil araç abonelik sistemi</h1>}
                        </div>
                        <div className='row mt-2 mb-4 text-center'>
                            <h6 className={styles.textContent}>
                                {isLoading ? <p className='d-inline'><Skeleton /></p> : <p>{Text}</p>}
                            </h6>
                        </div>
                        <div className={`row justify-content-center my-5`}>
                            {
                                isLoading ?
                                    <div className={`w-25 p-2 text-center`}>
                                        <Skeleton />
                                    </div>
                                    :
                                    <div className={`w-25 p-2 ${styles.landingBtnBg} text-center`}>
                                        <ListElement href="Models" text={"Modeller"} color='White' hoverColor='White' boldness='500' isHover={true} />
                                    </div>
                            }


                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LandingInfo