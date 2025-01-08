import React from 'react'
import styles from './styles.module.css';
import Image from '../Image/Image';
import Icons from '../../assets/icons/icons';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListElement from '../ListElement/ListElement';
import dummyImg from "../../assets/images/AboutUsImages/img";
import apiService from '../../api/apiService';
import { endpoints } from '../../api/apiConfig';
import { useToastManagerContext } from '../../Contexts/ToastManagerContext';
import Tooltip from '../Tooltip/Tooltip';
import Icon from '../Icon/Icon';

interface ModelCardProps {
    id: number;
    image: string;
    type: string;
    brandName: string;
    personCount: number;
    gear: string;
    luggageCount: number;
    doorCount: number;
    price: string;

}


function ModelCard({ id, image, type, brandName, personCount, gear, luggageCount, doorCount, price }: ModelCardProps) {
    const { showToast } = useToastManagerContext();

    const addFavorite = async (id: number) => {
        try {
            await apiService(endpoints.favorites, "POST", id);
            showToast("Araç Favorilere eklendi", "s")
        } catch (error: any) {
            const errorMessage = error.status;
            switch (errorMessage) {
                case 401:
                    showToast("Yetkisiz işlem. Lütfen giriş yapın !", "d");
                    break;
                case "403":
                    showToast("Bu işlemi gerçekleştiremezsiniz", "d");
                    break;
                case "404":
                    showToast("Kaynak bulunamadı.", "d");
                    break;
                case "500":
                    showToast("Sunucu hatası oluştu. Lütfen tekrar deneyin.", "d");
                    break;
                default:
                    showToast("Bir hata oluştu. Lütfen tekrar deneyin.", "d");
                    break;
            }
        }
    }

    return (
        <>
            <div className={`${styles.cardBg} border `}>
                <div className={`container overflow-hidden`} >
                    <div className={styles.favButtonContainer}>
                        <button onClick={() => addFavorite(id)} className={`${styles.favButton} `}>★</button>
                    </div>
                    <div className={`${styles.imgHover} row `}>
                        <ListElement href={`Models/${id}`} text={<Image URL={dummyImg.img} Width='310px'></Image>} />
                    </div>

                </div>
                <div className='container'>
                    <p className={`${styles.brandColor}`}>
                        <span className={`${styles.typeFontColor} h-100 d-flex align-items-center'`}>{type}</span>
                        <ListElement href={`Models/${id}`} text={brandName} /> </p>
                </div>

                <div className='container mt-4 text-center' >
                    <hr className={`${styles.hrColor}`} />
                    <div className='row'>
                        <div className='col-3'>
                            <Icon TooltipText='Kişi Kapasitesi'><img className={`border  p-1 ${styles.IconSize}`} src={Icons.PersonIcon} /></Icon>
                        </div>
                        <div className='col-3'>
                            <Icon TooltipText='Şanzıman'><img className={`border  p-1 ${styles.IconSize}`} src={Icons.GearIcon}></img></Icon>

                        </div>
                        <div className='col-3'>
                            <Icon TooltipText='Bagaj'><img className={`border  p-1 ${styles.IconSize}`} src={Icons.LuggageIcon}></img></Icon>

                        </div>
                        <div className='col-3'>
                            <Icon TooltipText='Kapı Sayısı'><img className={`border  p-1 ${styles.IconSize}`} src={Icons.CarDoorIcon}></img></Icon>

                        </div>
                    </div>
                    <div className='row'>
                        <div className={`${styles.iconFont} col-3`}>{personCount}</div>
                        <div className={`${styles.iconFont} col-3`}>{gear}</div>
                        <div className={`${styles.iconFont} col-3`}>{luggageCount}</div>
                        <div className={`${styles.iconFont} col-3`}>{doorCount}</div>
                    </div>
                    <hr className={`${styles.hrColor}`} />
                </div>
                <div className='container mt-4 '>
                    <div className='row '>
                        <div className='col-12 mb-3 ps-3'>
                            <FontAwesomeIcon style={{ color: "#1A2B48" }} icon={faBoltLightning}></FontAwesomeIcon>
                            <span className={`${styles.priceStyling} ms-2`}>
                                {price} TL + KDV <span style={{ color: "#7A7A7A" }}>/ay</span>
                            </span>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ModelCard