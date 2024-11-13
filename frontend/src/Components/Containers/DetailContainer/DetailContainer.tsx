import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Image from '../../Image/Image';
import dummy from '../../../assets/dummyImg/dummyCarImage.jpg'
import { ReactComponent as GreenCheck } from '../../../assets/icons/greenCheck.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTag } from '@fortawesome/free-solid-svg-icons'
import styles from './styles.module.css'
import Icons from '../../../assets/icons/icons';

function DetailContainer() {

    const { id } = useParams();

    //apiya burada detay bilgisi isteği yapılacak
    //sayfada dinamik olacak kısmılar = isim, fotoğraf, hizmetler olacak ve foreach ile dönülecek, araç özellikleri, marka, statik bilgi de ayarlanabilir olmalı
    //

    return (
        <>
            <div className='container mt-5 pt-5'>
                <div className='row'>
                    <div className='col-12 ps-5'>
                        <h2>Dizel – Manuel Ford Tourneo Courier</h2> {/* Dinamik */}
                        <p className='mt-3'> Aylık <span className='fw-bold'>32.900 TL + kdv </span> ‘den başlayan fiyatlar ile sizlerle!
                            Üstelik aylık sadece 699 TL +kdv ile Aile Paketine üye olabilir ve aile bireylerinizi ek kullanıcı olarak ekleyebilirsiniz!</p>
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-6 '>
                        <Image URL={dummy} Width='600' />{/* Dinamik */}
                    </div>

                    <div className='col-3 '>

                        <div className='row text-center'>
                            <h3 className='ps-4'>Marka</h3>
                        </div>

                        <hr className='mt-2' />
                        <div className='container mt-3 text-center '>
                            <div className='row'>
                                <div className='col-3 d-flex justify-content-end align-items-center'>
                                    <FontAwesomeIcon style={{ color: "#1A2B48" }} icon={faTag}></FontAwesomeIcon>
                                </div>
                                <div className='col-9 ps-0 d-flex'>
                                    <span className={styles.feats}>Ford</span> {/* Dinamik */}
                                </div>
                            </div>
                        </div>


                        <div className='row mt-5 text-center'>
                            <h3 className='ps-4'>Kapasite Bilgisi</h3>

                        </div>
                        <hr className='mt-2' />
                        <div className='container mt-3 text-center '>
                            <div className='row'>

                                <div className='col-3 d-flex justify-content-end align-items-center'>
                                    <div className=''><img className={`${styles.IconSize}`} src={Icons.PersonIcon}></img></div>
                                </div>
                                <div className='col-9 ps-0 d-flex'>
                                    {/* Dinamik Dolacak */}
                                </div>
                            </div>

                            <div className='row mt-4'>
                                <div className='col-3 d-flex justify-content-end align-items-center'>
                                    <div className=''> <img className={`${styles.IconSize}`} src={Icons.LuggageIcon}></img></div>
                                </div>
                                <div className='col-9 ps-0 d-flex'>
                                    {/* Dinamik Dolacak */}
                                </div>
                            </div>

                            <div className='row mt-4'>
                                <div className='col-3 d-flex justify-content-end align-items-center'>
                                    <div className=''><img className={`${styles.IconSize}`} src={Icons.CarDoorIcon}></img></div>
                                </div>
                                <div className='col-9 ps-0 d-flex'>
                                    {/* Dinamik Dolacak */}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='col-3 '>
                        <div className='row text-center'>
                            <h3 className='ps-4'>Araç Özellikleri</h3>
                        </div>
                        <hr className='mt-2' />
                        <div className='container mt-1 text-center '>

                            {/* foreach ile dönülecek ksıım burası */}
                            <div className='row'>
                                <div className='col-3 d-flex justify-content-end align-items-center'>
                                    <FontAwesomeIcon style={{ color: "#1A2B48" }} icon={faStar}></FontAwesomeIcon>
                                </div>
                                <div className='col-9 ps-0 d-flex'>
                                    <span className={`${styles.feats}`}>1499 cm³ Motor Hacmi</span>
                                </div>
                            </div>

                            <p>
                            </p>
                        </div>
                    </div>
                </div>

                <div className='row pt-3 mt-3'>
                    <div className='container'>
                        <h3 className='text-center'>Bu Araçla Birlikte Sunulan Diğer Hizmetler</h3>  <hr />
                    </div>

                    {/* foreach ile dönülecek */}
                    <div className='col-3 mt-3 justify-content-center d-flex'>
                        <p><GreenCheck width="20" height="20" /><span className='ms-2 fw-bold'>Otopark Hizmeti</span></p>
                    </div>
                </div>

            </div >
        </>
    )
}

export default DetailContainer