import styles from './styles.module.css';
import Image from '../Image/Image';
import Icons from '../../assets/icons/icons';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListElement from '../ListElement/ListElement';
import apiService from '../../api/apiService';
import { useToastManagerContext } from '../../Contexts/ToastManagerContext';
import Icon from '../Icon/Icon';
import { StatusHandler } from '../../common/StatusHandler';

interface ModelCardProps {
    id: number;
    slug: string;
    image: string;
    type: string;
    brandName: string;
    personCount: number;
    gear: string;
    luggageCount: number;
    doorCount: number;
    price: string;

}


function ModelCard({ id, slug, image, type, brandName, personCount, gear, luggageCount, doorCount, price }: ModelCardProps) {

    const { showToast } = useToastManagerContext();
    const addFavorite = async (id: number) => {
        try {
            const { data, status }: any = await apiService(process.env.REACT_APP_FAVORITES_ENDPOINT, "POST", id);
            StatusHandler(status, data, showToast)
        } catch (error: any) {
            const { status, message } = error;
            StatusHandler(status, message, showToast)

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
                        <ListElement href={`Models/${slug}`} text={<Image URL={image} Width='250px'></Image>} />

                    </div>

                </div>
                <div className='container'>
                    <p className={`${styles.brandColor}`}>
                        <span className={`${styles.typeFontColor} h-100 d-flex align-items-center'`}>{type}</span>
                        <ListElement href={`Models/${slug}`} text={brandName} /> </p>
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
                            <FontAwesomeIcon style={{ color: "gold" }} icon={faBoltLightning}></FontAwesomeIcon>
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