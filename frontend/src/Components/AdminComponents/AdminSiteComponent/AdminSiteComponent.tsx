import React, { useCallback, useEffect, useState } from 'react'
import { useSiteSettingsContext } from '../../../Contexts/SiteSettingsContext'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from "./styles.module.css"
import apiService from '../../../api/apiService';
import { endpoints } from '../../../api/apiConfig';
import { useToastManagerContext } from '../../../Contexts/ToastManagerContext';
import { StatusHandler } from '../../../common/StatusHandler';
import { useConfirmContext } from '../../../Contexts/ConfirmationContext';
import mainTextValidation, { reasonTextValidation, serviceTextValidation } from './SiteSettingsValidation';
import { selectIcon } from '../../../common/IconPack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface SettingsMainTextProps {
    id: number;
    text: string;
}
interface SettingsReasonTextProps {
    id: number;
    title: string;
    content: string;
}
interface ISettingsServiceTextIcons {
    id: number;
    name: string;
}
interface SettingsServicesTextProps {
    id: number;
    title: string;
    content: string;
    icon: ISettingsServiceTextIcons;
}


function AdminSiteComponent() {

    const { error, settings } = useSiteSettingsContext();
    const { showToast } = useToastManagerContext();
    const { showConfirmation } = useConfirmContext();
    const [icons, setIcons] = useState<ISettingsServiceTextIcons[] | null>(null);


    const updateMainText = async (values: SettingsMainTextProps) => {
        showConfirmation("Ana metin güncellenecektir. Devam edilsin mi?", async () => {
            try {
                const dataToSend = { Text: values.text };
                const { data, status }: any = await apiService(endpoints.mainText + `${values.id}`, "PUT", dataToSend);
                StatusHandler(status, data, showToast)
            } catch (error) {
                const { status, message }: any = error;
                StatusHandler(status, message, showToast)

            }
        })


    }


    const updateServiceTexts = async (values: SettingsServicesTextProps) => {
        showConfirmation("Hizmet metni güncellenecektir. Devam edilsin mi?", async () => {
            try {
                const dataToSend = { Title: values.title, Content: values.content, IconId: values.icon.id }
                const { data, status }: any = await apiService(endpoints.serviceText + `${values.id}`, "PUT", dataToSend);
                StatusHandler(status, data, showToast)
            } catch (error) {
                const { status, message }: any = error;
                StatusHandler(status, message, showToast)
            }
        })

    }


    const updateReasonTexts = async (values: SettingsReasonTextProps) => {
        showConfirmation("Sebep metni güncellenecektir. Devam edilsin mi?", async () => {
            try {
                const dataToSend = { Title: values.title, Content: values.content }
                const { data, status }: any = await apiService(endpoints.reasonText + `${values.id}`, "PUT", dataToSend);
                StatusHandler(status, data, showToast)
            } catch (error) {
                const { status, message }: any = error;
                StatusHandler(status, message, showToast)
            }
        })

    }

    const fetchIcons = useCallback(async () => {
        try {
            const { data } = await apiService(endpoints.icons, "GET");
            setIcons(data);
        } catch (error) {
            console.log(error);
        }
    }, [])


    useEffect(() => {
        fetchIcons();
    }, [])


    if (error) return <p>{error}</p>
    return (
        <>
            <div className='col-4'>
                <div className='container  p-0'>
                    {
                        settings?.mainText ?
                            (
                                <>
                                    <Formik validationSchema={mainTextValidation} initialValues={settings?.mainText[0]} onSubmit={updateMainText} enableReinitialize >
                                        <Form>
                                            <div className='row'>
                                                <div className='col-12'><h5>Ana Metin <span className={styles.error}> *<ErrorMessage name="text" component="span" className={`${styles.error}`} /></span></h5>
                                                </div>
                                            </div>
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

                                {settings?.reasons?.map((item: any) => (
                                    <Formik validationSchema={reasonTextValidation} key={item.id} initialValues={{ id: item.id, title: item.title, content: item.content }}
                                        onSubmit={updateReasonTexts} enableReinitialize>
                                        <Form>

                                            <div className="row mt-2 ">
                                                <div className="col-10 ">
                                                    <div className='row'>
                                                        <div className='col-12'>
                                                            <span className={styles.error}>
                                                                <ErrorMessage name="title" component="span" className={`${styles.error}`} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <Field id={`title`} name="title" className={styles.infos} />
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-12'>
                                                            <span className={styles.error}>
                                                                <ErrorMessage name="content" component="span" className={`${styles.error}`} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <Field id={`content`} name="content" className={styles.infos} placeholder="İçerik" />
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
            </div >
            <div className='col-4 '>
                <h5>Hizmetler</h5>
                {
                    settings?.services ?
                        (
                            <>

                                {settings?.services?.map((item: any) => (
                                    <Formik validationSchema={serviceTextValidation} key={item.id} initialValues={item}
                                        onSubmit={updateServiceTexts} enableReinitialize>
                                        <Form>
                                            <div className="row mt-2">
                                                <div className="col-10">
                                                    <div className='row'>
                                                        <div className='col-9'>
                                                            <div className={styles.error}>
                                                                <ErrorMessage name="title" component="span" className={`${styles.error}`} />
                                                            </div>
                                                            <div className={styles.error}>
                                                                <ErrorMessage name="icon" component="span" className={`${styles.error}`} />
                                                            </div>
                                                            <div className={styles.error}>
                                                                <ErrorMessage name="content" component="span" className={`${styles.error}`} />
                                                            </div>
                                                        </div>
                                                        <div className='col-9 p-0'>
                                                            <Field id={`title`} name="title" className={styles.infos} />

                                                        </div>

                                                        <div className='col-1 px-auto py-auto'>
                                                            {selectIcon(item.icon.name, 25)}
                                                        </div>
                                                        <div className='col-2 ps-0 pe-0'>
                                                            <Field as="select" id="icon.id" name="icon.id" className={styles.infos}>
                                                                {icons?.map((icon) => (

                                                                    <option selected={icon.id === item.icon.id} key={icon.id} value={icon.id}>
                                                                        {icon.name}
                                                                    </option>
                                                                ))}

                                                            </Field>
                                                        </div>

                                                    </div>
                                                    <div className='row'>
                                                        <Field id={`content`} name="content" className={styles.infos} />
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

        </>
    )
}

export default AdminSiteComponent