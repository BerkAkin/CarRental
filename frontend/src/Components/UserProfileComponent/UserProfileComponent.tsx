import styles from "./styles.module.css"
import { Field, Form, Formik } from 'formik'
import { useInfoContext } from '../../Contexts/UserInfoContext'
import { endpoints } from "../../api/apiConfig";
import apiService from "../../api/apiService";
import { StatusHandler } from "../../common/StatusHandler";
import { useToastManagerContext } from '../../Contexts/ToastManagerContext';
import { useConfirmContext } from "../../Contexts/ConfirmationContext";


interface InfoFormProps {
    email: string;
    phoneNum: string;
    createdAt: string;
}

function UserProfileComponent() {

    const { userInfo, loading, error } = useInfoContext();
    const { showConfirmation } = useConfirmContext();
    const { showToast } = useToastManagerContext();


    const updateUserInfo = async (values: InfoFormProps) => {
        showConfirmation("Bilgiler Güncellensin Mi ?", async () => {
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
        </>
    )
}

export default UserProfileComponent