import React from 'react'
import Image from '../../Image/Image'
import img from '../../../assets/images/AboutUsImages/img';
import styles from './styles.module.css';
import Slider from 'react-slick';
import SimpleSlider from '../../Slider/Slider';

function AboutContainer() {
    return (
        <>
            <div className='container mt-4 pt-3'>
                <div className='row'>
                    <div className='col-12 d-flex justify-content-center'>
                        <Image Height='420' Width='1300' URL={img.img} Round={true} Alt='banner'></Image>
                    </div>
                </div>
                <div className='row my-5 pt-1'>
                    <div className='col-12'>
                        <h2 className={styles.textHeader}>Flexper'ın Hikayesi</h2>
                        <p className={`${styles.textContent} mt-4`}>
                            Flexper, yenilikçi mobilite çözümleri geliştirmek amacıyla çok
                            alternatifli ve müşteri merkezli yeni bir abonelik hizmeti olarak
                            Gembox A.Ş altında faaliyete girmiş bir projedir. Flexper araç aboneliği,
                            ihtiyacınız olabilecek tüm hizmetlerin bir arada olduğu yeni bir araç
                            kiralama şeklidir.
                        </p>
                    </div>
                </div>
                <div className='row pt-3'>
                    <div className='col-6'>
                        <h5 className={styles.textHeader}>Misyonumuz</h5>
                        <p className={`${styles.textContent} mt-3`}>
                            Müşterilerimizin mobilite ihtiyaçlarına esnek,
                            kapsayıcı ve çok alternatifli çözümler geliştirerek
                            abonelik sistemİni ülkemize tanıtmak.
                        </p>
                    </div>
                    <div className='col-6'>
                        <h5 className={styles.textHeader}>Vizyonumuz</h5>
                        <p className={`${styles.textContent} mt-3`}>
                            Ülkemizde araç kiralama ekosisteminde yer alacak
                            abonelik sisteminin öncü ve en büyük temsilcisi olmak.
                        </p>
                    </div>
                </div>


            </div>
            <div className='my-3 pt-5'>
                <SimpleSlider />
            </div>
        </>
    )
}

export default AboutContainer