import React from 'react'
import styles from './styles.module.css';
import Image from '../Image/Image';
import Icons from '../../assets/icons/icons';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListElement from '../ListElement/ListElement';

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

function SliderModelCard({ id, image, type, brandName, personCount, gear, luggageCount, doorCount, price }: ModelCardProps) {
    return (
        <>
            <div className={`border rounded ${styles.cardBg}`}>
                <div className={`container overflow-hidden rounded-top`} >
                    <div className={`${styles.imgHover} row`}>
                        <ListElement href={`Models/${id}`} text={<Image URL={image} Width='310px' Height='200px'></Image>} />
                    </div>
                </div>
                <div className='container mt-1 ps-4 pt-3'>
                    <p className={`${styles.brandColor}`}>
                        <span className={`${styles.typeFontColor}`}>{type}</span>
                        <ListElement href={`Models/${id}`} text={brandName} />
                    </p>

                </div>


                <div className='container text-center mt-4 ' >
                    <hr className={`${styles.hrColor}`} />
                    <div className='row'>
                        <div className='col-3 d-flex justify-content-center'>
                            <img className={`border rounded p-1 ${styles.IconSize}`} src={Icons.PersonIcon}></img>
                        </div>
                        <div className='col-3 d-flex justify-content-center'>
                            <img className={`border rounded p-1 ${styles.IconSize}`} src={Icons.GearIcon}></img>
                        </div>
                        <div className='col-3 d-flex justify-content-center'>
                            <img className={`border rounded p-1 ${styles.IconSize}`} src={Icons.LuggageIcon}></img>
                        </div>
                        <div className='col-3 d-flex justify-content-center'>
                            <img className={`border rounded p-1 ${styles.IconSize}`} src={Icons.CarDoorIcon}></img>
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

                <div className='container ps-3'>
                    <div className='row '>
                        <div className='col-12 mb-3'>
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

export default SliderModelCard