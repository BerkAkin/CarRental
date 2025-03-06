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
    label: string;
}
interface SettingsServicesTextProps {
    id: number;
    title: string;
    content: string;
    icon: ISettingsServiceTextIcons;
}


function AdminSiteComponent() {

    const { error, settings, fetchSettings } = useSiteSettingsContext();
    const { showToast } = useToastManagerContext();
    const { showConfirmation } = useConfirmContext();
    const [icons, setIcons] = useState<ISettingsServiceTextIcons[] | null>(null);


    const updateMainText = async (values: SettingsMainTextProps) => {
        showConfirmation("Ana metin güncellenecektir. Devam edilsin mi?", async () => {
            try {
                const dataToSend = { Text: values.text };
                const { data, status }: any = await apiService(endpoints.mainText + `${values.id}`, "PUT", dataToSend);
                StatusHandler(status, data, showToast)
                fetchSettings();
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
                StatusHandler(status, data, showToast);
                fetchSettings();
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
                fetchSettings();

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
            <div className={`${styles.innerBG} col-12 my-2 p-3 border table-responsive`}>
                <h4>Ana Metin</h4>
                <hr />
                <div className='container-fluid p-0 '>
                    {
                        settings?.mainText ?
                            (
                                <table className={`${styles.tableFontSize} table-striped table-hover table table-responsive mt-2`}>
                                    <thead>
                                        <tr>
                                            <th className='col-11'>Ana Metin İçeriği</th>
                                            <th className='col-1 text-center'></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <Formik validationSchema={mainTextValidation} initialValues={settings?.mainText[0]} onSubmit={updateMainText} enableReinitialize >
                                                {({ handleSubmit }) => (
                                                    <>
                                                        <td className='border'>
                                                            <span className={styles.error}><ErrorMessage name="text" component="span" className={`${styles.error}`} /></span>
                                                            <Field as="textarea" id="text" name="text" className={`${styles.infosTA}`} />
                                                        </td>
                                                        <td className='border'>
                                                            <button className={`${styles.btn}`} type="button" onClick={() => handleSubmit()}>↻</button>
                                                        </td>
                                                    </>

                                                )}
                                            </Formik>
                                        </tr>
                                    </tbody>
                                </table>

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

            <div className={`${styles.innerBG} col-12 my-4 p-3 border table-responsive`}>
                <h4>Sebepler</h4>
                <hr />
                {settings?.reasons && (
                    <table className={`${styles.tableFontSize} table-striped table-responsive table-hover table mt-2`}>
                        <thead>
                            <tr>
                                <th className='col-2'>Başlık</th>
                                <th className='col-9'>İçerik</th>
                                <th className='col-1 text-center'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {settings.reasons.map((item: any) => (
                                <tr key={item.id}>
                                    <Formik validationSchema={reasonTextValidation} initialValues={{ id: item.id, title: item.title, content: item.content }} onSubmit={updateReasonTexts} enableReinitialize>
                                        {({ handleSubmit }) => (
                                            <>
                                                <td className='border'>
                                                    <Field name="title" className={styles.infos} />
                                                    <ErrorMessage name="title" component="span" className={styles.error} />
                                                </td>
                                                <td className='border'>
                                                    <Field name="content" className={styles.infos} placeholder="İçerik" />
                                                    <ErrorMessage name="content" component="span" className={styles.error} />
                                                </td>
                                                <td className='border'>
                                                    <button className={styles.btn} type="button" onClick={() => handleSubmit()}>↻</button>
                                                </td>
                                            </>
                                        )}
                                    </Formik>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className={`${styles.innerBG} col-12 p-3 border mb-1 table-responsive`}>
                <h4>Hizmetler</h4>
                <hr />
                {
                    settings?.services ?
                        (
                            <>

                                <table className={`${styles.tableFontSize} table-striped table-hover table `}>
                                    <thead>
                                        <tr>
                                            <th className='col-2'>Başlık</th>
                                            <th className='col-7'>İçerik</th>
                                            <th className='col-1 text-center'>İkon</th>
                                            <th className='col-1 text-center'>İkon Değiştir</th>
                                            <th className='col-1 text-center'></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {settings?.services?.map((item: any) => (
                                            <tr>
                                                <Formik validationSchema={serviceTextValidation} key={item.id} initialValues={item}
                                                    onSubmit={updateServiceTexts} enableReinitialize>
                                                    {({ handleSubmit }) => (
                                                        <>
                                                            <td className='border'>
                                                                <ErrorMessage name="title" component="span" className={`${styles.error}`} />
                                                                <Field id={`title`} name="title" className={styles.infos} /></td>
                                                            <td className='border'>
                                                                <ErrorMessage name="content" component="span" className={`${styles.error}`} />
                                                                <Field id={`content`} name="content" className={styles.infos} />
                                                            </td>
                                                            <td className='text-center border'>
                                                                {selectIcon(item.icon.name, 25)}
                                                            </td>
                                                            <td className='border'>
                                                                <ErrorMessage name="icon" component="span" className={`${styles.error}`} />
                                                                <Field as="select" id="icon.id" name="icon.id" className={styles.infos}>
                                                                    {icons?.map((icon) => (
                                                                        <option selected={icon.id === item.icon.id} key={icon.id} value={icon.id}>
                                                                            {icon.label}
                                                                        </option>
                                                                    ))}
                                                                </Field>
                                                            </td>
                                                            <td className='border'>
                                                                <button className={styles.btn} type="button" onClick={() => handleSubmit()}>↻</button>
                                                            </td>

                                                        </>
                                                    )}
                                                </Formik>
                                            </tr>

                                        ))}



                                    </tbody>
                                </table>


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