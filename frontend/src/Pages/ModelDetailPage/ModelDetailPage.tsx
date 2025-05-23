import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Image from '../../Components/Image/Image';
import { ReactComponent as GreenCheck } from '../../assets/icons/greenCheck.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTag } from '@fortawesome/free-solid-svg-icons'
import styles from './styles.module.css'
import Icons from '../../assets/icons/icons';
import apiService from '../../api/apiService';
import ListElement from '../../Components/ListElement/ListElement';
import Icon from '../../Components/Icon/Icon';
import SkeletonDetail from '../../Components/Skeletons/SkeletonDetail/SkeletonDetail';

interface ModelDetailsProps {
    id: number,
    slug: string,
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
    otherServices: string
    otherFeatures: string,
    imageDirectory: string
}


function ModelDetailPage() {

    const { slug } = useParams();
    const [modelDetail, setModelDetail] = useState<ModelDetailsProps>();
    const [error, setError] = useState<string>("");
    const [isloading, SetIsLoading] = useState<null | boolean>(true);
    const otherFeatures = modelDetail?.otherFeatures.split(",").map(service => service.trim());
    const otherServices = modelDetail?.otherServices.split(",").map(service => service.trim());

    useEffect(() => {
        const getDetail = async () => {
            try {
                const { data, status }: any = await apiService(process.env.REACT_APP_MODEL_DETAIL_ENDPOINT! + slug, "GET");
                setModelDetail(data);
            } catch (error) {
                setError("Model detaylarını görüntülerken bir hata meydana geldi. Lütfen yöneticinize başvurun");
                console.error(error);
            } finally {
                SetIsLoading(false);
            }
        }
        getDetail();
    }, [])


    if (error) return <p>{error}</p>
    if (isloading) return <SkeletonDetail />

    return (
        <>

            <div className={`${styles.innerContainer} container my-5 py-5`}>
                <div className='row'>
                    <div className='col-12'>
                        <h2>{modelDetail?.fuelType.fuel} – {modelDetail?.gearType.gear} {modelDetail?.brandName} {modelDetail?.modelName}</h2>
                        <p style={{ color: "#7A7A7A" }} className='mt-3 '>{modelDetail?.description} Aylık <span className='fw-bold'>  {modelDetail?.price} + kdv </span> ‘den başlayan fiyatlar ile sizlerle!
                            Üstelik aylık sadece 699 TL +kdv ile Aile Paketine üye olabilir ve aile bireylerinizi ek kullanıcı olarak ekleyebilirsiniz!
                        </p>
                    </div>

                </div>


                <div className='row mt-4'>
                    <div className='col-lg-6 col-12 d-flex align-items-center'>
                        <Image URL={`${modelDetail?.imageDirectory}`} Width='600' />
                    </div>

                    <div className='col-lg-6 col-12 '>
                        <div className='row h-50 mt-4'>
                            <div className={`col-sm-6 col-12`}>
                                <div className='row text-center'>
                                    <h3>Araç Bilgisi</h3>
                                </div>
                                <div className='row'>
                                    <div className='container mt-1'>

                                        <div className='row'>
                                            <div className='col-12 d-flex justify-content-center align-items-center'>
                                                <FontAwesomeIcon style={{ color: "#1A2B48", paddingBottom: "15px" }} icon={faTag}></FontAwesomeIcon>
                                                <div className='ps-2'>
                                                    <p className={styles.feats}>{modelDetail?.brandName} - {modelDetail?.modelName} </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 d-flex justify-content-center align-items-center'>
                                                <FontAwesomeIcon style={{ color: "#1A2B48", paddingBottom: "15px" }} icon={faTag}></FontAwesomeIcon>
                                                <div className='ps-2'>
                                                    <p className={styles.feats}>{modelDetail?.carType.car}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 d-flex justify-content-center align-items-center'>
                                                <FontAwesomeIcon style={{ color: "#1A2B48", paddingBottom: "15px" }} icon={faTag}></FontAwesomeIcon>
                                                <div className='ps-2'>
                                                    <p className={styles.feats}>{modelDetail?.gearType.gear}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 d-flex justify-content-center align-items-center'>
                                                <FontAwesomeIcon style={{ color: "#1A2B48", paddingBottom: "15px" }} icon={faTag}></FontAwesomeIcon>
                                                <div className='ps-2'>
                                                    <p className={styles.feats}>{modelDetail?.fuelType.fuel}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-sm-6 m-sm-0 mt-5'>
                                <div className='row text-center'>
                                    <h3>Kapasite Bilgisi</h3>
                                </div>
                                <div className='row'>
                                    <div className='container mt-1'>
                                        <div className='row'>
                                            <div className='col-4 d-flex justify-content-center'>
                                                <Icon TooltipText='Kişi Kapasitesi'><img className={`${styles.IconSize}`} src={Icons.PersonIcon}></img></Icon>
                                            </div>
                                            <div className='col-4 d-flex justify-content-center'>
                                                <Icon TooltipText='Bagaj'> <img className={`${styles.IconSize}`} src={Icons.LuggageIcon}></img></Icon>
                                            </div>
                                            <div className='col-4 d-flex justify-content-center '>
                                                <Icon TooltipText='Kapı Sayısı'> <img className={`${styles.IconSize}`} src={Icons.CarDoorIcon}></img></Icon>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-4 d-flex justify-content-center '>
                                                <p>{modelDetail?.personCount}</p>
                                            </div>
                                            <div className='col-4 d-flex justify-content-center'>
                                                <p>{modelDetail?.luggageCount}</p>
                                            </div>
                                            <div className='col-4 d-flex justify-content-center'>
                                                <p>{modelDetail?.doorCount}</p>
                                            </div>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row h-50 mt-4'>
                            <div className='col-sm-6 col-12'>
                                <div className='row text-center'>
                                    <h3>Araç Özellikleri</h3>
                                </div>
                                <div className='row'>
                                    <div className='container mt-1'>

                                        {otherFeatures?.map((item, key) => (
                                            <div className='row' key={key}>
                                                <div className='col-12 d-flex justify-content-center align-items-center'>
                                                    <FontAwesomeIcon style={{ color: "#1A2B48", paddingBottom: "15px" }} icon={faStar}></FontAwesomeIcon>
                                                    <div className='ps-2'>
                                                        <p className={styles.feats}>{item}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6 col-12 m-sm-0 mt-5'>
                                <div className='row text-center'>
                                    <h3> Diğer Hizmetler</h3>
                                </div>
                                <div className='row'>
                                    <div className='container mt-1'>
                                        <div className='row'>
                                            {otherServices?.map((item, key) => (
                                                <div className='row' key={key}>
                                                    <div className='col-12 d-flex justify-content-center align-items-center'>
                                                        <GreenCheck width="15" height="15" /><div className='ps-2'>
                                                            <p className={styles.feats}>{item}</p>
                                                        </div>
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
                <div className='mt-5 pt-5 pt-md-0 d-md-flex justify-content-end'>
                    <div className={`p-2 ${styles.BtnBg} text-center`}>
                        <ListElement href="Contact" text={"Bize Ulaşın"} color='White' hoverColor='White' boldness='500' isHover={true} />
                    </div>
                </div>
            </div >


        </>
    )
}

export default ModelDetailPage