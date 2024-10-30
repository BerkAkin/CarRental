import React from 'react'
import styles from "./styles.module.css"

function InfoContainer() {
    return (
        <>
            <div className='container-fluid mt-5 pt-5'>
                <div className='row mt-5'>
                    <h2 className={styles.textHeader}>Geleceğin Abonelik Deneyimi: Yepyeni Dünyamıza Hoş Geldiniz</h2></div>
                <div className='row mt-2'>
                    <h6 className={styles.textContent}>
                        Araç abonelik sistemi, sizi karmaşık prosedürlerle boğulmaktan kurtararak özgürlüğün tadını çıkarmanızı
                        sağlar. Sadece istediğiniz araç modelini seçin ve her şey dahil paketlerimizden birini tercih edin. Aracınız kapınıza kadar teslim edilsin,
                        anahtarları alın ve sadece sürmeye başlayın. Geri kalan tüm detaylar ve işlemler bizim sorumluluğumuzda. Siz sadece sürün, gerisini biz
                        halledelim!
                    </h6>
                </div>
            </div>

        </>
    )
}

export default InfoContainer