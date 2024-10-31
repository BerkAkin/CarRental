import React from 'react'
import Image from '../Image/Image'
import Button from '../Button/Button'
import styles from './styles.module.css'
import images from '../../assets/images/LandingImages/images';

function LandingContainer() {
    return (
        <div>
            <div className='container-fluid mt-5'>
                <div className='row'>
                    <div className='col-4 d-flex justify-content-center flex-column'>
                        <div className='row ps-3 '>
                            <h1 id={styles["landingText"]}>Her şey dahil araç abonelik sistemi</h1>
                        </div>
                        <div className='row mt-5 align-items-end h-25 d-flex justify-content-center '>
                            <Button Text='Detay' BgColor='#E00000' Color='#FFFFFF' Border="none" CrRd='3px' Width='90px' Height='40px' />
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

export default LandingContainer