import React from 'react'
import styles from './styles.module.css';
import Image from '../../../Image/Image';
import Icons from '../../../../assets/icons/icons';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListElement from '../../../ListElement/ListElement';

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

/* componentte onclick olan yerlerde detay sayfasına gidilecek id bilgisi yollanacak ve orda da id üzerinde tekrar sorgu atılacak ve detaylar getirilecek */

function ModelCard({ id, image, type, brandName, personCount, gear, luggageCount, doorCount, price }: ModelCardProps) {
    return (
        <>
            <div className={`${styles.cardBg} border rounded`}>
                <div className={`container overflow-hidden rounded`} >
                    <div className={`${styles.imgHover} row `}>
                        <ListElement href={`Models/${id}`} text={<Image URL={image} Width='310px'></Image>} />
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
                        <div className='col-3'><img className={`border rounded p-1 ${styles.IconSize}`} src={Icons.PersonIcon}></img></div>
                        <div className='col-3'><img className={`border rounded p-1 ${styles.IconSize}`} src={Icons.GearIcon}></img></div>
                        <div className='col-3'> <img className={`border rounded p-1 ${styles.IconSize}`} src={Icons.LuggageIcon}></img></div>
                        <div className='col-3'><img className={`border rounded p-1 ${styles.IconSize}`} src={Icons.CarDoorIcon}></img></div>
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