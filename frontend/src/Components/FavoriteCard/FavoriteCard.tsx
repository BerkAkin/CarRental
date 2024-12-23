import React from 'react'
import styles from './styles.module.css';
import Image from '../Image/Image';
import Icons from '../../assets/icons/icons';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListElement from '../ListElement/ListElement';
import dummyImg from "../../assets/images/AboutUsImages/img";


interface favoriteCardProps {
    removeFavorites: (id: number) => {},
    modelId: number,
    carType: string,
    gearType: string,
    brandName: string,
    modelName: string,
    personCount: number,
    price: string,
    imageDirectory: string
}

function FavoriteCard({ removeFavorites, modelId, carType, gearType, brandName, modelName, personCount, price, imageDirectory }: favoriteCardProps) {
    return (
        <div>
            <div className={`${styles.cardBg} border`}>
                <div className={`container overflow-hidden`} >
                    <div className={styles.favButtonContainer}>
                        <button className={styles.favButton} onClick={() => removeFavorites(modelId)}>X</button>
                    </div>
                    <div className={`row`}>
                        <ListElement href={`Models/${modelId}`} text={<Image URL={dummyImg.img} Width='310px'></Image>} />
                    </div>
                </div>
                <div className='container mt-2'>
                    <span className={`${styles.typeFontColor} d-flex align-items-center'`}>{carType}</span>
                    <div className={`${styles.brandColor} `}>
                        <ListElement href={`Models/${modelId}`} text={[brandName, " ", modelName]} />
                    </div>
                </div>

                <div className='container mt-1 text-center' >
                    <hr className={`${styles.hrColor}`} />
                    <div className='row'>
                        <div className='col-6'><img className={`border  p-1 ${styles.IconSize}`} src={Icons.PersonIcon}></img></div>
                        <div className='col-6'><img className={`border  p-1 ${styles.IconSize}`} src={Icons.GearIcon}></img></div>
                    </div>
                    <div className='row'>
                        <div className={`${styles.iconFont} col-6`}>{personCount}</div>
                        <div className={`${styles.iconFont} col-6`}>{gearType}</div>
                    </div>
                    <hr className={`${styles.hrColor}`} />
                </div>
                <div className='container mt-1 '>
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



        </div>
    )
}

export default FavoriteCard