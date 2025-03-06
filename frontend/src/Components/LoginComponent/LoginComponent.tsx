import { useState } from 'react'
import styles from './styles.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import loginValidationSchema from './LoginValidationSchema';
import Image from '../Image/Image';
import apiService from '../../api/apiService';
import { endpoints } from '../../api/apiConfig';
import { useAuthContext } from '../../Contexts/AuthContext';
import { useToastManagerContext } from '../../Contexts/ToastManagerContext';
import { StatusHandler } from '../../common/StatusHandler';
import forgetValidationSchema from './ForgetValidationSchema';


interface LoginProps {
    email: string;
    password: string;
}

interface ResetProps {
    email: string;
}

const initialLoginValues = {
    email: '',
    password: ''
}
const initialForgetValues = {
    email: ''
}

function LoginComponent() {

    const { fetchUserType } = useAuthContext();
    const { showToast } = useToastManagerContext();

    const [isReset, setIsReset] = useState<boolean | null>(false);

    const handleIsReset = () => {
        setIsReset(!isReset)
    }

    const handleLogin = async (values: LoginProps, { setSubmitting }: any) => {
        try {
            const { data, status }: any = await apiService(endpoints.login, "POST", values)
            setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);
            localStorage.setItem("accessToken", data);
            await fetchUserType();
            StatusHandler(status, "Yeniden Hoş Geldiniz !", showToast)
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            const { status, message }: any = error;
            StatusHandler(status, message, showToast)

        }
        finally {
            setSubmitting(false);
        }
    };

    const handleResetPassword = async (values: ResetProps, { setSubmitting }: any) => {
        const value = {
            email: values.email
        };
        try {
            const { data, status }: any = await apiService(endpoints.resetPasswordRequest, "POST", value)
            setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);

            StatusHandler(200, "Parola Sıfırlama Maili Gönderildi. Lütfen Posta Kutunuzu Kontrol Edin", showToast)

        } catch (error) {
            const { status, message }: any = error;
            StatusHandler(status, message, showToast)

        }
        finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        if (isReset) {
            await handleResetPassword(values, { setSubmitting })
        }
        else {
            await handleLogin(values, { setSubmitting });
        }
    }

    return (
        <>
            {isReset ?
                <Formik initialValues={initialForgetValues} validationSchema={forgetValidationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={`${styles.outerContainer} `}>
                                <div className={`${styles.Form}`}>
                                    <div className='container w-100 h-100'>
                                        <div className={`${styles.headerArea} row`}>
                                            <div className='col-6 d-flex justify-content-start align-items-center'>
                                                <p className={`${styles.headerText} ps-1 pt-4`}>Parola Sıfırla</p>
                                            </div>
                                            <div className='col-6 d-flex justify-content-center pt-2 align-items-center'>
                                                <div>
                                                    <Image URL={"/static/logo.png"} Width='150px'></Image>
                                                </div>

                                            </div>
                                        </div>

                                        <div className='row mt-4'>
                                            <div className='col-12'>E-Posta<span className={styles.error}> *</span>
                                                <ErrorMessage name="email" component="span" className={`${styles.error}`} />
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-12'>
                                                <Field className={`${styles.inputs}`} type="email" id="email" name="email" />
                                            </div>
                                        </div>
                                        <div className='row mt-4'>
                                            <div className='col-12 '>
                                                <button className={`${styles.btn}`} type="submit" disabled={isSubmitting}>PAROLA SIFIRLA</button>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-6 ps-3 d-flex justify-content-start'>
                                                <button className={`${styles.operationBtn}`} onClick={handleIsReset}>Giriş Yap</button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </Form>
                    )}

                </Formik>

                :

                <Formik initialValues={initialLoginValues} validationSchema={loginValidationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={`${styles.outerContainer} `}>
                                <div className={`${styles.Form}`}>
                                    <div className='container w-100 h-100'>
                                        <div className={`${styles.headerArea} row`}>
                                            <div className='col-6 d-flex justify-content-start align-items-center'>
                                                <p className={`${styles.headerText} ps-1 pt-4`}>{isReset ? "Parola Sıfırla" : "Giriş Yap"}</p>
                                            </div>
                                            <div className='col-6 d-flex justify-content-center pt-2 align-items-center'>
                                                <div>
                                                    <Image URL={"/static/logo.png"} Width='150px'></Image>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='row '>
                                            <div className='col-12'>E-Posta<span className={styles.error}> *</span>
                                                <ErrorMessage name="email" component="span" className={`${styles.error}`} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <Field className={`${styles.inputs}`} type="email" id="email" name="email" />
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-12'>Parola<span className={styles.error}> *</span>
                                                <ErrorMessage name="password" component="span" className={`${styles.error}`} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <Field className={`${styles.inputs}`} type="password" id="password" name="password" />
                                            </div>
                                        </div>
                                        <div className='row mt-4'>
                                            <div className='col-12 '>
                                                <button className={`${styles.btn}`} type="submit" disabled={isSubmitting}>GİRİŞ YAP</button>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-6 ps-3 d-flex justify-content-start'>
                                                <button className={`${styles.operationBtn}`} onClick={handleIsReset}>Parolamı Unuttum</button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </Form>

                    )}

                </Formik>
            }
        </>




    )
}

export default LoginComponent