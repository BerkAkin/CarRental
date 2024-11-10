import React from 'react'
import Image from '../../../Image/Image'
import Button from '../../../Button/Button'
import styles from './styles.module.css'
import images from '../../../../assets/images/LandingImages/images';

function LandingInfo() {
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
                                Araç abonelik sistemi, sizi karmaşık prosedürlerle boğulmaktan kurtararak özgürlüğün tadını çıkarmanızı
                                sağlar. Sadece istediğiniz araç modelini seçin ve her şey dahil paketlerimizden birini tercih edin. Aracınız kapınıza kadar teslim edilsin,
                                anahtarları alın ve sadece sürmeye başlayın. Geri kalan tüm detaylar ve işlemler bizim sorumluluğumuzda. Siz sadece sürün, gerisini biz
                                halledelim!
                            </h6>
                        </div>
                        <div className='row justify-content-center my-5'>
                            <Button tAlign='center' FW='500' Text='Detay' BgColor='#E00000' Color='#FFFFFF' Border="none" CrRd='3px' Width='200px' Height='40px' />
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