import React, { useEffect, useState } from 'react'
import styles from './styles.module.css';
import apiService from '../../../../api/apiService';
import { endpoints } from '../../../../api/apiConfig';
import { Field, Formik, Form } from 'formik';
import ModelEditCard from './ModelEditCard/ModelEditCard';
import Image from '../../../Image/Image';
import dummyImage from '../../../../assets/images/LandingImages/Mach-e.1920x1080-1920x1080.jpg'



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

interface SingleComment {
    id: number;
    content: string;
    starCount: number;
    isActive: boolean;
    userName: string;
    userType: string;
}
interface Comments {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    data: SingleComment[]
}



interface AddNewCarProps {
    fuelTypeId: number,
    gearTypeId: number,
    carTypeId: number,
    brandName: string,
    modelName: string,
    description: string,
    personCount: number,
    luggageCount: number,
    doorCount: number,
    price: number,
    otherServices: string,
    otherFeatures: string,
    imageDirectory: string
}

const initialValuesOfAddCar: AddNewCarProps = {
    fuelTypeId: 0,
    gearTypeId: 0,
    carTypeId: 0,
    brandName: "",
    modelName: "",
    description: "",
    personCount: 0,
    luggageCount: 0,
    doorCount: 0,
    price: 0,
    otherServices: "",
    otherFeatures: "",
    imageDirectory: ""
}


function AdminProfile() {


    //BİLGİLERİN TUTULDUĞU STATELER
    const [userInfo, setUserInfo] = useState<InfoFormProps>();
    const [models, setModels] = useState<Model>();
    const [gears, setGears] = useState<Gears[]>();
    const [carTypes, setCarTypes] = useState<Cars[]>();
    const [fuels, setFuels] = useState<Fuels[]>();
    const [comments, setComments] = useState<Comments>();
    const [settings, setSettings] = useState<SiteSettings>();
    const [modelCurrentPage, setModelCurrentPage] = useState<number>(1);
    const [commentsCurrentPage, setCommentsCurrentPage] = useState<number>(1);
    const [isAddingStatus, setIsAddingStatus] = useState<boolean>(false);


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
                const models = await apiService(endpoints.models, "GET", null, `?pageNumber=${modelCurrentPage}`)
                setModels(models);
            } catch (error) {
                console.log("Modeller alınırken hata:", error);
            }
        }
        getModels();
    }, [modelCurrentPage])

    useEffect(() => {
        const getComments = async () => {
            try {
                setModels(undefined);
                const adminComments = await apiService(endpoints.comments, "GET", null, `?pageNumber=${commentsCurrentPage}`)
                setComments(adminComments);

            } catch (error) {
                console.log("Yorumlar alınırken hata:", error);
            }
        }
        getComments();
    }, [commentsCurrentPage])

    useEffect(() => { }, [isAddingStatus])

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

    const HandleNextModelPage = () => {
        if (modelCurrentPage < (models?.totalPages || 1)) {
            setModelCurrentPage(prev => prev + 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
    const HandlePreviousModelPage = () => {
        if (modelCurrentPage > 1) {
            setModelCurrentPage(prev => prev - 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    const HandleNextCommentPage = () => {
        if (commentsCurrentPage < (comments?.totalPages || 1)) {
            setCommentsCurrentPage(prev => prev + 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
    const HandlePreviousCommentPage = () => {
        if (commentsCurrentPage > 1) {
            setCommentsCurrentPage(prev => prev - 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    const updateIsAddingStatus = () => {
        setIsAddingStatus(!isAddingStatus);
    }
    const addNewCarSubmitHandler = async (values: AddNewCarProps) => {
        try {
            const dataToSend = {
                fuelTypeId: Number(values.fuelTypeId),
                gearTypeId: Number(values.gearTypeId),
                carTypeId: Number(values.carTypeId),
                brandName: values.brandName,
                modelName: values.modelName,
                description: values.description,
                personCount: Number(values.personCount),
                luggageCount: Number(values.luggageCount),
                doorCount: Number(values.doorCount),
                price: Number(values.price),
                otherServices: values.otherServices.split(",") || [],
                otherFeatures: values.otherFeatures.split(",") || [],
                imageDirectory: values.imageDirectory,
            };
            await apiService(endpoints.models, "POST", dataToSend);
            alert("ok");
            setIsAddingStatus(!isAddingStatus);
        } catch (error) {
            console.error(error);
            alert("err");
        }
    }

    const commentOperation = async (id: number, type: string) => {
        console.log(id, type)
        try {
            if (type === "ok") {
                await apiService(endpoints.acceptComment, "PUT", id);
                alert("ok");
                const comments = await apiService(endpoints.comments, "GET");
                setComments(comments);
                return;
            }
            await apiService(endpoints.refuseComment, "PUT", id);
            const comments = await apiService(endpoints.comments, "GET");
            setComments(comments);
            alert("ok");
        } catch (error) {
            alert("hata");
            console.log(error);
        }
    }


    return (
        <>


            <div className={`container-fluid mt-4 pt-3 `}>
                <ul className="nav nav-tabs" role="tablist">
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
                        <a className={`${styles.navBtn} nav-link`} id="disabled-tab-5" data-bs-toggle="tab" href="#disabled-tabpanel-5">Yorumlar</a>
                    </li>
                </ul>

                <div className="tab-content" id="tab-content">
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
                                <div className='container-fluid'>
                                    {isAddingStatus === true ?
                                        (
                                            <>
                                                <div className='d-flex justify-content-end mt-4'>
                                                    <button onClick={updateIsAddingStatus} className={`${isAddingStatus ? styles.addBtnCancel : styles.addBtn}`} style={{ width: "150px" }}>{isAddingStatus ? "İptal Et" : "Yeni Model Ekle"}</button>
                                                </div>
                                                <Formik initialValues={initialValuesOfAddCar} onSubmit={addNewCarSubmitHandler}>
                                                    <Form>
                                                        <div className='container-fluid border my-4 p-0'>
                                                            <div className='row m-0 p-0'>
                                                                <div className='col-4 '>
                                                                    <Image URL={dummyImage} Width='600px'></Image>
                                                                </div>
                                                                <div className='col-8  p-0'>
                                                                    <div className='container-fluid h-100'>
                                                                        <div className='row'>

                                                                            <div className={`col-6 border`}>
                                                                                <div className='row text-center'><label htmlFor='brandName'>Marka</label></div>
                                                                                <div className='row'><Field className={`${styles.inputs} text-center`} name="brandName" id="brandName" /></div>
                                                                            </div>
                                                                            <div className={`col-6 border`}>
                                                                                <div className='row text-center'><label htmlFor='modelName'>Model</label></div>
                                                                                <div className='row'><Field className={`${styles.inputs} text-center`} name="modelName" id="modelName" /></div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='row'>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className={`col-4 border `}>
                                                                                <div className='row text-center'><label htmlFor='fuelType.fuel'>Yakıt</label></div>
                                                                                <div className='row'>
                                                                                    <Field as="select" className={`${styles.inputs}`} name="fuelTypeId" id="fuelTypeId" >
                                                                                        {fuels?.map((fuel) => (
                                                                                            <option key={fuel.id} value={fuel.id}>
                                                                                                {fuel.fuel}
                                                                                            </option>
                                                                                        ))}
                                                                                    </Field>
                                                                                </div>
                                                                            </div>
                                                                            <div className={`col-4 border `}>
                                                                                <div className='row text-center'><label htmlFor='gearType.gear'>Şanzıman</label></div>
                                                                                <div className='row '>
                                                                                    <Field as="select" className={`${styles.inputs} `} name="gearTypeId" id="gearTypeId" >
                                                                                        {gears?.map((gear) => (
                                                                                            <option key={gear.id} value={gear.id}>
                                                                                                {gear.gear}
                                                                                            </option>
                                                                                        ))}
                                                                                    </Field>
                                                                                </div>
                                                                            </div>
                                                                            <div className={`col-4  border`}>
                                                                                <div className='row text-center'><label htmlFor='carType.car'>Tip</label></div>
                                                                                <div className='row '>
                                                                                    <Field as="select" className={`${styles.inputs}`} name="carTypeId" id="carTypeId" >
                                                                                        {carTypes?.map((cartype) => (
                                                                                            <option key={cartype.id} value={cartype.id}>
                                                                                                {cartype.car}
                                                                                            </option>
                                                                                        ))}
                                                                                    </Field>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className={`col-12 border justify-content-center`}>
                                                                                <div className='row text-center'><label htmlFor='description'>Açıklama</label></div>
                                                                                <div className='row'><Field className={`${styles.inputs} text-center`} name="description" id="description" /></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className={`border col-4 justify-content-center`}>
                                                                                <div className='row text-center'><label htmlFor='personCount'>Kişi Sayısı</label></div>
                                                                                <div className='row'><Field className={`${styles.inputs} text-center`} name="personCount" id="personCount" /></div>
                                                                            </div>
                                                                            <div className={`border col-4 justify-content-center`}>
                                                                                <div className='row text-center'><label htmlFor='luggageCount'>Bagaj Sayısı</label></div>
                                                                                <div className='row'><Field className={`${styles.inputs} text-center`} name="luggageCount" id="luggageCount" /></div>
                                                                            </div>
                                                                            <div className={`border col-4 justify-content-center`}>
                                                                                <div className='row text-center'><label htmlFor='doorCount'>Kapı Sayısı</label></div>
                                                                                <div className='row'><Field className={`${styles.inputs} text-center`} name="doorCount" id="doorCount" /></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className={`col-12 border justify-content-center`}>
                                                                                <div className='row text-center'><label htmlFor='price'>Aylık Kiralama Bedeli</label></div>
                                                                                <div className='row'> <Field className={`${styles.inputs} text-center`} name="price" id="price" /></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className={`col-12 border justify-content-center`}>
                                                                                <div className='row text-center'><label htmlFor='otherServices'>Sunulan Diğer Hizmetler</label></div>
                                                                                <div className='row'>  <Field className={`${styles.inputs}`} name="otherServices" id="otherServices" /></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row '>
                                                                            <div className={`col-12 border justify-content-center`}>
                                                                                <div className='row text-center'><label htmlFor='otherFeatures'>Diğer Araç Özellikleri</label></div>
                                                                                <div className='row'> <Field className={`${styles.inputs}`} name="otherFeatures" id="otherFeatures" /></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row border'>
                                                                            <div className={`col-12 justify-content-center`}>
                                                                                <div className='row text-center'>
                                                                                    <button type='submit' className={styles.btn}>Ekle</button>

                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </Formik>
                                            </>
                                        ) :
                                        (
                                            <>
                                                <div className='d-flex justify-content-end mt-4'>
                                                    <button onClick={updateIsAddingStatus} className={`${isAddingStatus ? styles.addBtnCancel : styles.addBtn}`} style={{ width: "150px" }}>{isAddingStatus ? "İptal Et" : "Yeni Model Ekle"}</button>
                                                </div>
                                                <div className='d-flex justify-content-end mt-4'>
                                                    <button onClick={HandlePreviousModelPage} className={`${styles.btn}`} style={{ width: "150px" }}>Önceki Sayfa</button>
                                                    <button onClick={HandleNextModelPage} className={`${styles.btn} ms-3`} style={{ width: "150px" }}>Sonraki Sayfa</button>
                                                </div>
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
                                                <div className=' d-flex justify-content-end mt-5'>
                                                    <button onClick={HandlePreviousModelPage} className={`${styles.btn} mx-3`} style={{ width: "150px" }}>Önceki Sayfa</button>
                                                    <button onClick={HandleNextModelPage} className={`${styles.btn}`} style={{ width: "150px" }}>Sonraki Sayfa</button>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="disabled-tabpanel-5" role="tabpanel" aria-labelledby="disabled-tab-5">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div>
                                    <table className="table-striped table-hover table m-0 mt-4">
                                        <thead>
                                            <tr>
                                                <th scope="col">Ad Soyad</th>
                                                <th scope="col">E-Posta</th>
                                                <th scope="col">Kullanıcı Türü</th>
                                                <th scope="col">Aktif Mi</th>
                                                <th scope="col">Puan</th>
                                                <th scope="col">Yorum</th>
                                                <th scope="col">İşlemler</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {comments?.data ?
                                                (comments.data.map((item) => (
                                                    <>
                                                        <tr>
                                                            <td scope="row">{item.userName}</td>
                                                            <td>{item.userName}</td>
                                                            <td>{item.userType}</td>
                                                            <td>{item.isActive === true ? "Evet" : "Hayır"}</td>
                                                            <td>{item.starCount}</td>
                                                            <td>{item.content}</td>
                                                            <td>
                                                                {item.isActive === true ?
                                                                    (
                                                                        <>
                                                                            <button onClick={() => commentOperation(item.id, "")} className={`${styles.actionNoBtn} mx-2`}>Reddet</button>
                                                                        </>
                                                                    )
                                                                    :
                                                                    (
                                                                        <>
                                                                            <button onClick={() => commentOperation(item.id, "ok")} className={`${styles.actionOkBtn}`}>Onayla</button>
                                                                        </>
                                                                    )
                                                                }
                                                            </td>
                                                        </tr >
                                                    </>
                                                ))

                                                )
                                                :
                                                (<></>)}


                                        </tbody>
                                    </table>
                                    <div className='d-flex justify-content-end mt-4'>
                                        <button onClick={HandlePreviousCommentPage} className={`${styles.btn}`} style={{ width: "150px" }}>Önceki Sayfa</button>
                                        <button onClick={HandleNextCommentPage} className={`${styles.btn} ms-3`} style={{ width: "150px" }}>Sonraki Sayfa</button>
                                    </div>
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