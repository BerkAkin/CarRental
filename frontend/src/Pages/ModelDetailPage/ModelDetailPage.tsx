import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Image from '../../Components/Image/Image';
import { ReactComponent as GreenCheck } from '../../assets/icons/greenCheck.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTag } from '@fortawesome/free-solid-svg-icons'
import styles from './styles.module.css'
import Icons from '../../assets/icons/icons';
import sliderModels from '../../common/sliderModels';
import SimpleSlider from '../../Components/SimpleSlider/SimpleSlider';
import SliderModelCard from '../../Components/SliderModelCard/SliderModelCard';
import apiService from '../../api/apiService';
import { endpoints } from '../../api/apiConfig';
import ListElement from '../../Components/ListElement/ListElement';
import Icon from '../../Components/Icon/Icon';

interface ModelDetailsProps {
    id: number,
    carType: {
        id: number,
        car: string
    },
    fuelType: {
        id: number,
        fuel: string
    },
    gearType: {
        id: number,
        gear: string
    },
    brandName: string,
    modelName: string,
    description: string,
    personCount: number,
    luggageCount: number,
    doorCount: number,
    price: number,
    otherServices: [
    ],
    otherFeatures: [
    ],
    imageDirectory: string
}


function ModelDetailPage() {

    const { id } = useParams();
    const [modelDetail, setModelDetail] = useState<ModelDetailsProps>();

    useEffect(() => {
        const getDetail = async () => {
            try {
                const response = await apiService(endpoints.models + id, "GET");
                setModelDetail(response);
            } catch (error) {
                console.log("Model detayları alınırken hata:", error);
            }
        }
        getDetail();
    }, [])



    return (
        <>
            <div className='container my-5 py-5 '>
                <div className='row'>
                    <div className='col-12'>
                        <h2>{modelDetail?.fuelType.fuel} – {modelDetail?.gearType.gear} {modelDetail?.brandName} {modelDetail?.modelName}</h2>
                        <p style={{ color: "#7A7A7A" }} className='mt-3 '>{modelDetail?.description} Aylık <span className='fw-bold'>  {modelDetail?.price} + kdv </span> ‘den başlayan fiyatlar ile sizlerle!
                            Üstelik aylık sadece 699 TL +kdv ile Aile Paketine üye olabilir ve aile bireylerinizi ek kullanıcı olarak ekleyebilirsiniz!
                        </p>
                    </div>

                </div>


                <div className='row mt-4'>
                    <div className='col-6 d-flex align-items-center'>
                        <Image URL={`${modelDetail?.imageDirectory}`} Width='600' />
                    </div>

                    <div className='col-6 '>
                        <div className='row h-50'>
                            <div className='col-6'>
                                <div className='row'>
                                    <h3>Araç Bilgisi</h3>
                                </div>
                                <div className='row'>
                                    <div className='container mt-1'>
                                        <div className='row'>
                                            <div className='col-1'>
                                                <FontAwesomeIcon style={{ color: "#1A2B48" }} icon={faTag}></FontAwesomeIcon>
                                            </div>
                                            <div className='col-11 ps-2 '>
                                                <p className={styles.feats}>{modelDetail?.brandName} - {modelDetail?.modelName} </p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-1'>
                                                <FontAwesomeIcon style={{ color: "#1A2B48" }} icon={faTag}></FontAwesomeIcon>
                                            </div>
                                            <div className='col-11 ps-2 '>
                                                <p className={styles.feats}>{modelDetail?.carType.car}</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-1'>
                                                <FontAwesomeIcon style={{ color: "#1A2B48" }} icon={faTag}></FontAwesomeIcon>
                                            </div>
                                            <div className='col-11 ps-2 '>
                                                <p className={styles.feats}>{modelDetail?.gearType.gear}</p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-1'>
                                                <FontAwesomeIcon style={{ color: "#1A2B48" }} icon={faTag}></FontAwesomeIcon>
                                            </div>
                                            <div className='col-11 ps-2 '>
                                                <p className={styles.feats}>{modelDetail?.fuelType.fuel}</p>
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
                                                <Icon TooltipText='Kişi Kapasitesi'><img className={`${styles.IconSize}`} src={Icons.PersonIcon}></img></Icon>
                                            </div>
                                            <div className='col-2 d-flex justify-content-center'>
                                                <Icon TooltipText='Bagaj'> <img className={`${styles.IconSize}`} src={Icons.LuggageIcon}></img></Icon>
                                            </div>
                                            <div className='col-2 d-flex justify-content-center '>
                                                <Icon TooltipText='Kapı Sayısı'> <img className={`${styles.IconSize}`} src={Icons.CarDoorIcon}></img></Icon>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-2 d-flex justify-content-center '>
                                                <p>{modelDetail?.personCount}</p>
                                            </div>
                                            <div className='col-2 d-flex justify-content-center'>
                                                <p>{modelDetail?.luggageCount}</p>
                                            </div>
                                            <div className='col-2 d-flex justify-content-center'>
                                                <p>{modelDetail?.doorCount}</p>
                                            </div>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row h-50 pt-3 mt-4'>
                            <div className='col-6 '>
                                <div className='row'>
                                    <h3>Araç Özellikleri</h3>
                                </div>
                                <div className='row'>
                                    <div className='container mt-1'>
                                        {modelDetail?.otherFeatures.map((item, key) => (
                                            <div className='row' key={key}>
                                                <div className='col-1'>
                                                    <FontAwesomeIcon style={{ color: "#1A2B48" }} icon={faStar}></FontAwesomeIcon>
                                                </div>
                                                <div className='col-11 ps-2'>
                                                    <p className={`${styles.feats}`}>{item}</p>
                                                </div>
                                            </div>
                                        ))}
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
                                            {modelDetail?.otherServices.map((item, key) => (
                                                <div className='row' key={key}>
                                                    <div className='col-1'>
                                                        <GreenCheck width="15" height="15" />
                                                    </div>
                                                    <div className='col-11 ps-2'>
                                                        <p className={styles.feats}>{item}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-5 d-flex justify-content-end'>
                    <div className={`p-2 ${styles.BtnBg} text-center`}>
                        <ListElement href="Contact" text={"Bize Ulaşın"} color='White' hoverColor='White' boldness='500' isHover={true} />
                    </div>
                </div>
            </div >


        </>
    )
}

export default ModelDetailPage