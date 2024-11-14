import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Image from '../../Image/Image';
import dummy from '../../../assets/dummyImg/dummyCarImage.jpg'
import { ReactComponent as GreenCheck } from '../../../assets/icons/greenCheck.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTag } from '@fortawesome/free-solid-svg-icons'
import styles from './styles.module.css'
import Icons from '../../../assets/icons/icons';
import sliderModels from '../../../common/sliderModels';
import SimpleSlider from '../../SimpleSlider/SimpleSlider';
import SliderModelCard from '../../SliderModelCard/SliderModelCard';

function DetailContainer() {

    const { id } = useParams();

    //apiya burada detay bilgisi isteği yapılacak
    //sayfada dinamik olacak kısmılar = isim, fotoğraf, hizmetler olacak ve foreach ile dönülecek, araç özellikleri, marka, statik bilgi de ayarlanabilir olmalı
    //

    return (
        <>
            <div className='container my-5 py-5'>
                <div className='row'>
                    <div className='col-12'>
                        <h2>Dizel – Manuel Ford Tourneo Courier</h2> {/* Dinamik */}
                        <p style={{ color: "#7A7A7A" }} className='mt-3 '> Aylık <span className='fw-bold'>32.900 TL + kdv </span> ‘den başlayan fiyatlar ile sizlerle!
                            Üstelik aylık sadece 699 TL +kdv ile Aile Paketine üye olabilir ve aile bireylerinizi ek kullanıcı olarak ekleyebilirsiniz!</p>
                    </div>

                </div>


                <div className='row mt-4'>
                    <div className='col-6 d-flex align-items-center'>
                        <Image URL={dummy} Width='600' />{/* Dinamik */}
                    </div>

                    <div className='col-6 '>
                        <div className='row h-25'>
                            <div className='col-6'>
                                <div className='row'>
                                    <h3>Marka</h3>
                                </div>
                                <div className='row'>
                                    <div className='container mt-1'>
                                        <div className='row'>
                                            <div className='col-1'>
                                                <FontAwesomeIcon style={{ color: "#1A2B48" }} icon={faTag}></FontAwesomeIcon>
                                            </div>
                                            <div className='col-11 ps-2 '>
                                                <p className={styles.feats}>Ford</p> {/* Dinamik */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='row'>
                                    <h3>Kapasite Bilgisi</h3>
                                </div>
                                <div className='row'>
                                    <div className='container mt-1'>
                                        <div className='row'>
                                            <div className='col-2 d-flex justify-content-center'>
                                                <img className={`${styles.IconSize}`} src={Icons.PersonIcon}></img>
                                            </div>
                                            <div className='col-2 d-flex justify-content-center'>
                                                <img className={`${styles.IconSize}`} src={Icons.LuggageIcon}></img>
                                            </div>
                                            <div className='col-2 d-flex justify-content-center '>
                                                <img className={`${styles.IconSize}`} src={Icons.CarDoorIcon}></img>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-2 d-flex justify-content-center '>
                                                {/* Dinamik */} <p>4</p>
                                            </div>
                                            <div className='col-2 d-flex justify-content-center'>
                                                {/* Dinamik */}<p>4</p>
                                            </div>
                                            <div className='col-2 d-flex justify-content-center'>
                                                {/* Dinamik */} <p>4</p>
                                            </div>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row h-75 pt-3'>
                            <div className='col-6 '>
                                <div className='row'>
                                    <h3>Araç Özellikleri</h3>
                                </div>
                                <div className='row'>
                                    <div className='container mt-1'>
                                        {/* foreach ile dönülecek ksıım burası */}
                                        <div className='row'>
                                            <div className='col-1'>
                                                <FontAwesomeIcon style={{ color: "#1A2B48" }} icon={faStar}></FontAwesomeIcon>
                                            </div>
                                            <div className='col-11 ps-2'>
                                                <p className={`${styles.feats}`}>1499 cm³ Motor Hacmi</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-1'>
                                                <FontAwesomeIcon style={{ color: "#1A2B48" }} icon={faStar}></FontAwesomeIcon>
                                            </div>
                                            <div className='col-11 ps-2'>
                                                <p className={`${styles.feats}`}>1499 cm³ Motor Hacmi</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-1'>
                                                <FontAwesomeIcon style={{ color: "#1A2B48" }} icon={faStar}></FontAwesomeIcon>
                                            </div>
                                            <div className='col-11 ps-2'>
                                                <p className={`${styles.feats}`}>1499 cm³ Motor Hacmi</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-1'>
                                                <FontAwesomeIcon style={{ color: "#1A2B48" }} icon={faStar}></FontAwesomeIcon>
                                            </div>
                                            <div className='col-11 ps-2'>
                                                <p className={`${styles.feats}`}>1499 cm³ Motor Hacmi</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-1'>
                                                <FontAwesomeIcon style={{ color: "#1A2B48" }} icon={faStar}></FontAwesomeIcon>
                                            </div>
                                            <div className='col-11 ps-2'>
                                                <p className={`${styles.feats}`}>1499 cm³ Motor Hacmi</p>
                                            </div>
                                        </div>

                                        <p>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='row'>
                                    <h3> Diğer Hizmetler</h3>
                                </div>
                                <div className='row'>
                                    <div className='container mt-1'>
                                        <div className='row'>
                                            {/* foreach ile dönülecek */}
                                            <div className='col-1'>
                                                <GreenCheck width="15" height="15" />
                                            </div>
                                            <div className='col-11 ps-2'>
                                                <p className={styles.feats}>Otopark Hizmeti</p>
                                            </div>
                                            <div className='col-1'>
                                                <GreenCheck width="15" height="15" />
                                            </div>
                                            <div className='col-11 ps-2'>
                                                <p className={styles.feats}>Otopark Hizmeti</p>
                                            </div>
                                            <div className='col-1'>
                                                <GreenCheck width="15" height="15" />
                                            </div>
                                            <div className='col-11 ps-2'>
                                                <p className={styles.feats}>Otopark Hizmeti</p>
                                            </div>
                                            <div className='col-1'>
                                                <GreenCheck width="15" height="15" />
                                            </div>
                                            <div className='col-11 ps-2'>
                                                <p className={styles.feats}>Otopark Hizmeti</p>
                                            </div>
                                            <div className='col-1'>
                                                <GreenCheck width="15" height="15" />
                                            </div>
                                            <div className='col-11 ps-2'>
                                                <p className={styles.feats}>Otopark Hizmeti</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className='mt-5 pt-5'>
                <div className='mt-5'>
                    <SimpleSlider slidesToShow={4} header='Diğer Modeller' items={sliderModels} renderItem={(item) => (

                        <SliderModelCard type={item.Type} id={item.id} brandName={item.Brand} doorCount={item.DoorCount} gear={item.Gear} image={item.imgURL} luggageCount={item.LuggageCount} personCount={item.PeopleCount} price={item.Price} />
                    )} />
                </div>

            </div>


        </>
    )
}

export default DetailContainer