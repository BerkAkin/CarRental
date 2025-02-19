import styles from "./styles.module.css"
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useInfoContext } from '../../Contexts/UserInfoContext'
import { endpoints } from "../../api/apiConfig";
import apiService from "../../api/apiService";
import { StatusHandler } from "../../common/StatusHandler";
import { useToastManagerContext } from '../../Contexts/ToastManagerContext';
import { useConfirmContext } from "../../Contexts/ConfirmationContext";
import formatDate from "../../common/DateFormatter";
import userProfileInfoValidationSchema from "./ProfileInfoValidationSchema";


interface InfoFormProps {
    email: string;
    phoneNum: string;
    createdAt: string;
}

function UserProfileComponent() {

    const { userInfo, loading, error } = useInfoContext();
    console.log(userInfo)
    const { showConfirmation } = useConfirmContext();
    const { showToast } = useToastManagerContext();


    const updateUserInfo = async (values: InfoFormProps) => {
        showConfirmation("Kullanıcı bilgileri güncellensin mi? ", async () => {
            try {
                const { data, status }: any = await apiService(endpoints.ownInfo, "PUT", values);
                StatusHandler(status, data, showToast)
            } catch (error) {
                const { status, message }: any = error;
                StatusHandler(status, message, showToast)
            }
        })
    }


    if (loading) return <p>Yükleniyor</p>
    if (error) return <p>{error}</p>
    return (
        <>
            {userInfo ? (
                <div className={`${styles.bgColor} container border my-2 p-3`}>
                    <Formik validationSchema={userProfileInfoValidationSchema} initialValues={userInfo} onSubmit={updateUserInfo} enableReinitialize>
                        <div>
                            <div className="row">
                                <h4 className="text-muted text-end">Yeniden Hoş Geldin, {userInfo.name} {userInfo.surname} !</h4>
                            </div>
                            <div className="row ">
                                <div className="col-12 ">

                                    <Form>
                                        <div className='row mt-4 '>
                                            <div className='col-12'>E-Posta<span className={styles.error}> *</span>
                                                <span className=''> <ErrorMessage name="email" component="span" className={`${styles.error}`} /></span>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <Field className={`${styles.infos} `} id="email" name="email" />
                                            </div>
                                        </div>
                                        <div className='row mt-4'>
                                            <div className='col-12'>Telefon Numarası<span className={styles.error}> *</span>
                                                <span className=''> <ErrorMessage name="phoneNum" component="span" className={`${styles.error}`} /></span>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <Field className={`${styles.infos} mx-auto`} id="phoneNum" name="phoneNum" />
                                            </div>
                                        </div>

                                        <div className='row mt-4 text-muted'>
                                            <label className={`${styles.label} mb-2`}>Üyelik Tarihi: {formatDate(userInfo.createdAt)}</label>
                                        </div>
                                        <div className='row mt-4 d-flex justify-content-center'>
                                            <div className='col-12 my-4'>
                                                <button className={`${styles.btn}`} type='submit'>Bilgilerimi Değiştir</button>
                                            </div>
                                        </div>
                                    </Form>
                                </div>

                            </div>

                        </div>

                    </Formik>

                </div>

            ) : (
                <p>Bilgiler yükleniyor...</p>
            )}
        </>
    )
}

export default UserProfileComponent