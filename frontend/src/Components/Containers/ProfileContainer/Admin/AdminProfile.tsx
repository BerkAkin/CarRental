import React, { useEffect, useState } from 'react'
import styles from './styles.module.css';
import apiService from '../../../../api/apiService';
import { endpoints } from '../../../../api/apiConfig';
import { Field, Formik, Form } from 'formik';
import ModelEditCard from './ModelEditCard/ModelEditCard';



//FORM VE STATE İNTERFACELERİ
interface InfoFormProps {
    email: string;
    phoneNum: string;
    createdAt: string;
}

interface SettingsMainTextProps {
    id: number;
    text: string;
}
interface SettingsReasonTextProps {
    id: number;
    title: string;
    content: string;
}
interface SettingsServicesTextProps {
    id: number;
    title: string;
    content: string;
    icon: string;
}

interface Gears {
    id: number;
    gear: string;
}
interface Fuels {
    id: number;
    fuel: string;
}
interface Cars {
    id: number;
    car: string;
}
interface SiteSettings {
    mainText: SettingsMainTextProps[];
    services: SettingsServicesTextProps[];
    reasons: SettingsReasonTextProps[];
}
interface Model {
    currentPage: number;
    data: [
        {
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
            imageDirectory: string,
        }
    ];
    totalPages: number;
    totalRecords: number;
}




function AdminProfile() {


    //BİLGİLERİN TUTULDUĞU STATELER
    const [userInfo, setUserInfo] = useState<InfoFormProps>();
    const [models, setModels] = useState<Model>();
    const [gears, setGears] = useState<Gears[]>();
    const [carTypes, setCarTypes] = useState<Cars[]>();
    const [fuels, setFuels] = useState<Fuels[]>();
    const [users, setUsers] = useState();
    const [messages, setMessages] = useState();
    const [comments, setComments] = useState();
    const [settings, setSettings] = useState<SiteSettings>();
    const [currentPage, setCurrentPage] = useState(1);


    //BİLGİLERİN ALINDIĞI EFFECT VE APİ ÇAĞRIIM
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const infoResponse = await apiService(endpoints.ownInfo, "GET");
                const siteSettings = await apiService(endpoints.homepage, "GET");
                const fuels = await apiService(endpoints.fuels, "GET");
                const gears = await apiService(endpoints.gears, "GET");
                const carTypes = await apiService(endpoints.carTypes, "GET");
                setUserInfo(infoResponse);
                setSettings(siteSettings);
                setFuels(fuels);
                setGears(gears);
                setCarTypes(carTypes);
            } catch (error) {

            }
        }
        fetchAllData();
    }, [])

    useEffect(() => {
        const getModels = async () => {
            try {
                setModels(undefined);
                const models = await apiService(endpoints.models, "GET", null, `?pageNumber=${currentPage}`)
                setModels(models);
            } catch (error) {
                console.log("Modeller alınırken hata:", error);
            }
        }
        getModels();
    }, [currentPage])


    //FORM İŞLEMLERİ SUBMİT VB
    const updateUserInfo = async (values: InfoFormProps) => {
        try {
            await apiService(endpoints.ownInfo, "PUT", values);
            alert("Bilgiler Güncellendi");
        } catch (error) {
            console.log(error);
        }
    }

    const updateMainText = async (values: SettingsMainTextProps) => {
        try {
            const dataToSend = { Text: values.text };
            await apiService(endpoints.mainText + `${values.id}`, "PUT", dataToSend);
            alert("Ana Metin Güncellendi")
        } catch (error) {
            console.log(error)
        }

    }

    const updateServiceTexts = async (values: SettingsServicesTextProps) => {
        try {
            const dataToSend = { Title: values.title, Content: values.content, Icon: values.icon }
            await apiService(endpoints.serviceText + `${values.id}`, "PUT", dataToSend);
            alert("Servis Metni Güncellendi")
        } catch (error) {
            console.log(error)
        }
    }

    const updateReasonTexts = async (values: SettingsReasonTextProps) => {
        try {
            const dataToSend = { Title: values.title, Content: values.content }
            await apiService(endpoints.reasonText + `${values.id}`, "PUT", dataToSend);
            alert("Sebep Metni Güncellendi")
        } catch (error) {
            console.log(error)
        }
    }

    const HandleNextPage = () => {
        if (currentPage < (models?.totalPages || 1)) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
    const HandlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }



    return (
        <>


            <div className={`container-fluid mt-4 pt-3 `}>

                <ul className="nav nav-tabs mt-2" role="tablist">
                    <li className="nav-item " >
                        <a className={`${styles.navBtn} nav-link active`} id="disabled-tab-0" data-bs-toggle="tab" href="#disabled-tabpanel-0">Bilgilerim</a>
                    </li>
                    <li className="nav-item" >
                        <a className={`${styles.navBtn} nav-link`} id="disabled-tab-1" data-bs-toggle="tab" href="#disabled-tabpanel-1">Site Ayarları</a>
                    </li>
                    <li className="nav-item">
                        <a className={`${styles.navBtn} nav-link`} id="disabled-tab-2" data-bs-toggle="tab" href="#disabled-tabpanel-2">Modeller</a>
                    </li>
                    <li className="nav-item">
                        <a className={`${styles.navBtn} nav-link`} id="disabled-tab-3" data-bs-toggle="tab" href="#disabled-tabpanel-3">Kullanıcılar</a>
                    </li>
                    <li className="nav-item">
                        <a className={`${styles.navBtn} nav-link`} id="disabled-tab-4" data-bs-toggle="tab" href="#disabled-tabpanel-4">İletişim Mesajları</a>
                    </li>
                    <li className="nav-item">
                        <a className={`${styles.navBtn} nav-link`} id="disabled-tab-5" data-bs-toggle="tab" href="#disabled-tabpanel-5">Yorumlar</a>
                    </li>
                </ul>

                <div className="tab-content pt-3" id="tab-content">
                    <div className="tab-pane active" id="disabled-tabpanel-0" role="tabpanel" aria-labelledby="disabled-tab-0">
                        <div className='container'>
                            <div className='row'>
                                <div className='container'>
                                    {userInfo ? (
                                        <>
                                            <Formik initialValues={userInfo} onSubmit={updateUserInfo} enableReinitialize>
                                                <div>
                                                    <Form>
                                                        <div className='row mt-3'>
                                                            <label className={`${styles.label} mb-2`}>E-Posta</label>
                                                            <Field className={`${styles.infos} `} id="email" name="email" />
                                                        </div>
                                                        <div className='row mt-4'>
                                                            <label className={`${styles.label} mb-2`}>Telefon Numarası</label>
                                                            <Field className={`${styles.infos} mx-auto`} id="phoneNum" name="phoneNum" />
                                                        </div>
                                                        <div className='row mt-4'>
                                                            <label className={`${styles.label} mb-2`}>Üyelik Tarihi</label>
                                                            <Field className={`${styles.infos} mx-auto`} id="createdAt" name="createdAt" />
                                                        </div>


                                                        <div className='row mt-5 d-flex justify-content-center'>
                                                            <button className={`${styles.btn}`} type='submit'>Bilgilerimi Değiştir</button>
                                                        </div>
                                                    </Form>
                                                </div>

                                            </Formik>
                                            <div className='row mt-2 d-flex justify-content-center'>
                                                <button className={`${styles.btn}`}>Şifremi Değiştir</button>
                                            </div>
                                        </>

                                    ) : (
                                        <p>Bilgiler yükleniyor...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="disabled-tabpanel-1" role="tabpanel" aria-labelledby="disabled-tab-1">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-4'>
                                    <div className='container  p-0'>
                                        <h5>Ana Metin</h5>
                                        {
                                            settings?.mainText ?
                                                (
                                                    <>
                                                        <Formik initialValues={settings?.mainText[0]} onSubmit={updateMainText} enableReinitialize >
                                                            <Form>
                                                                <div>
                                                                    <Field rows={10} as="textarea" id="text" name="text" className={`${styles.infosTA}`} />
                                                                </div>
                                                                <div className="mt-2">
                                                                    <button className={`${styles.btn}`} type="submit">Ana Metni Güncelle</button>
                                                                </div>
                                                            </Form>
                                                        </Formik>
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <p>Yükleniyor</p>
                                                    </>
                                                )
                                        }
                                    </div>



                                </div>
                                <div className='col-4'>
                                    <h5>Sebepler</h5>
                                    {
                                        settings?.reasons ?
                                            (
                                                <>

                                                    {settings?.reasons?.map((item) => (
                                                        <Formik key={item.id} initialValues={{ id: item.id, title: item.title, content: item.content }}
                                                            onSubmit={updateReasonTexts} enableReinitialize>
                                                            <Form>
                                                                <div className="row mt-2 ">
                                                                    <div className="col-10 ">
                                                                        <div className='row'>
                                                                            <Field id={`title-${item.id}`} name="title" className={styles.infos} />
                                                                        </div>
                                                                        <div className='row'>
                                                                            <Field id={`content-${item.id}`} name="content" className={styles.infos} placeholder="İçerik" />
                                                                        </div>


                                                                    </div>
                                                                    <div className="col align-items-center d-flex">
                                                                        <button className={styles.btn} type="submit">Sebebi Güncelle</button>
                                                                    </div>
                                                                </div>
                                                            </Form>
                                                        </Formik>
                                                    ))}


                                                </>
                                            )

                                            :

                                            (
                                                <></>
                                            )
                                    }
                                </div>
                                <div className='col-4 '>
                                    <h5>Hizmetler</h5>
                                    {
                                        settings?.services ?
                                            (
                                                <>

                                                    {settings?.services?.map((item) => (
                                                        <Formik key={item.id} initialValues={{ id: item.id, title: item.title, content: item.content, icon: item.icon }}
                                                            onSubmit={updateServiceTexts} enableReinitialize>
                                                            <Form>
                                                                <div className="row mt-2">
                                                                    <div className="col-10">
                                                                        <div className='row'>
                                                                            <div className='col-9 p-0'>
                                                                                <Field id={`title-${item.id}`} name="title" className={styles.infos} />
                                                                            </div>
                                                                            <div className='col-3 ps-1 pe-0'>
                                                                                <Field id={`icon-${item.id}`} name="icon" className={styles.infos} />
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <Field id={`content-${item.id}`} name="content" className={styles.infos} />
                                                                        </div>


                                                                    </div>
                                                                    <div className="col-2 align-items-center d-flex">
                                                                        <button className={styles.btn} type="submit">Hizmet Güncelle</button>
                                                                    </div>
                                                                </div>

                                                            </Form>
                                                        </Formik>
                                                    ))}


                                                </>
                                            )

                                            :

                                            (
                                                <></>
                                            )
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="disabled-tabpanel-2" role="tabpanel" aria-labelledby="disabled-tab-2">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='d-flex justify-content-end'>
                                    <button className={`${styles.btn}`} style={{ width: "150px" }}>Yeni Model Ekle</button>
                                </div>

                                <div className='container-fluid'>
                                    <div className='row d-flex flex-row '>
                                        {
                                            models && gears && carTypes && fuels ?
                                                (
                                                    <>
                                                        {models?.data.map((item) => (
                                                            <ModelEditCard Item={item} CarTypes={carTypes} Fuels={fuels} Gears={gears} />
                                                        ))}
                                                    </>
                                                )

                                                :
                                                (
                                                    <>Modeller Yüklenemedi</>
                                                )
                                        }
                                    </div>

                                </div>
                                <div className=' d-flex justify-content-end mt-5'>
                                    <button onClick={HandlePreviousPage} className={`${styles.btn} mx-3`} style={{ width: "150px" }}>Önceki Sayfa</button>
                                    <button onClick={HandleNextPage} className={`${styles.btn}`} style={{ width: "150px" }}>Sonraki Sayfa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="disabled-tabpanel-3" role="tabpanel" aria-labelledby="disabled-tab-3">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div>
                                    Kullanıcılar
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="disabled-tabpanel-4" role="tabpanel" aria-labelledby="disabled-tab-4">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div>
                                    İletişim Mesajları
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="disabled-tabpanel-5" role="tabpanel" aria-labelledby="disabled-tab-5">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div>
                                    Yorumlar
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >


        </>
    )
}

export default AdminProfile