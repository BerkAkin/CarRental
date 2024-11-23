import React from 'react'
import Image from '../../../Image/Image'
import Button from '../../../Button/Button'
import styles from './styles.module.css'
import images from '../../../../assets/images/LandingImages/images';
import ListElement from '../../../ListElement/ListElement';

interface landingInfoProps {
    Text: string[];
}

function LandingInfo({ Text }: landingInfoProps) {
    return (
        <div>
            <div className='container-fluid mt-3'>
                <div className='row'>
                    <div className='col-4 d-flex justify-content-center flex-column'>
                        <div className='row ps-5 my-4'>
                            <h1 id={styles["landingText"]}>Her şey dahil araç abonelik sistemi</h1>
                        </div>
                        <div className='row ps-5 mt-2 mb-4'>
                            <h6 className={styles.textContent}>
                                {Text}
                            </h6>
                        </div>
                        <div className={`row justify-content-center my-5`}>
                            <div className={`w-25 rounded p-2 ${styles.landingBtnBg} text-center`}>
                                <ListElement href="Models" text={"Modeller"} color='White' hoverColor='White' boldness='500' isHover={true} />
                            </div>

                        </div>
                    </div>
                    <div className='col-8'>
                        <Image URL={images.img} Width="1230px" Height="690px" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingInfo