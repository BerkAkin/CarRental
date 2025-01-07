import styles from "./styles.module.css"
import { Field, Form, Formik } from 'formik'
import { useInfoContext } from '../../Contexts/UserInfoContext'



function UserProfileComponent() {
    const { userInfo, updateUserInfo } = useInfoContext();
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