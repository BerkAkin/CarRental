import React from 'react'
import { useSiteSettingsContext } from '../../../Contexts/SiteSettingsContext'
import { Field, Form, Formik } from 'formik';
import styles from "./styles.module.css"
import apiService from '../../../api/apiService';
import { endpoints } from '../../../api/apiConfig';
import { useToastManagerContext } from '../../../Contexts/ToastManagerContext';
import { StatusHandler } from '../../../common/StatusHandler';


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

function AdminSiteComponent() {

    const { error, settings } = useSiteSettingsContext();
    const { showToast } = useToastManagerContext();


    const updateMainText = async (values: SettingsMainTextProps) => {
        try {
            const dataToSend = { Text: values.text };
            const { data, status }: any = await apiService(endpoints.mainText + `${values.id}`, "PUT", dataToSend);
            StatusHandler(status, data, showToast)
        } catch (error) {
            const { status, message }: any = error;
            StatusHandler(status, message, showToast)

        }

    }


    const updateServiceTexts = async (values: SettingsServicesTextProps) => {
        try {
            const dataToSend = { Title: values.title, Content: values.content, Icon: values.icon }
            const { data, status }: any = await apiService(endpoints.serviceText + `${values.id}`, "PUT", dataToSend);
            StatusHandler(status, data, showToast)
        } catch (error) {
            const { status, message }: any = error;
            StatusHandler(status, message, showToast)
        }
    }


    const updateReasonTexts = async (values: SettingsReasonTextProps) => {
        try {
            const dataToSend = { Title: values.title, Content: values.content }
            const { data, status }: any = await apiService(endpoints.reasonText + `${values.id}`, "PUT", dataToSend);
            StatusHandler(status, data, showToast)
        } catch (error) {
            const { status, message }: any = error;
            StatusHandler(status, message, showToast)
        }
    }

    if (error) return <p>{error}</p>

    return (
        <>
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

                                {settings?.reasons?.map((item: any) => (
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

                                {settings?.services?.map((item: any) => (
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

        </>
    )
}

export default AdminSiteComponent