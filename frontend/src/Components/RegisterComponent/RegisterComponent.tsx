import styles from './styles.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import registerValidationSchema from './RegisterValidationSchema';
import Image from '../Image/Image';
import apiService from '../../api/apiService';
import { useToastManagerContext } from '../../Contexts/ToastManagerContext';
import { StatusHandler } from '../../common/StatusHandler';
import { useNavigate } from 'react-router-dom';


interface RegisterProps {
    name: string;
    surname: string;
    email: string;
    phoneNum: string;
    password: string;
}

interface IRegister {
    closeModal: () => void
}



function RegisterComponent({ closeModal }: IRegister) {
    const { showToast } = useToastManagerContext();
    const navigate = useNavigate();

    const initialValues: RegisterProps = {
        email: '',
        password: '',
        name: '',
        surname: '',
        phoneNum: ''
    }

    const onSubmit = async (values: RegisterProps, { setSubmitting }: any) => {
        try {
            const { data, status }: any = await apiService(process.env.REACT_APP_REGISTER_ENDPOINT, "POST", values)
            setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);
            StatusHandler(status, data, showToast)
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            const { status, message }: any = error;
            StatusHandler(status, message, showToast)
        }
        finally {
            setSubmitting(false);
        }
    };


    return (
        <>
            <Formik initialValues={initialValues} validationSchema={registerValidationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className={`${styles.outerContainer} `}>
                            <div className={`${styles.Form}`}>
                                <div className='container '>
                                    <div className={`${styles.headerArea} row`}>
                                        <div className='col-6 d-flex justify-content-start align-items-center'>
                                            <p className={`${styles.headerText} ps-1 pt-4`}>Üye Ol</p>
                                        </div>
                                        <div className='col-6 d-flex justify-content-center pt-2 align-items-center'>
                                            <div>
                                                <Image URL={process.env.REACT_APP_STATIC_IMAGE + "logo.png"} Width='150px'></Image>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='row '>
                                        <div className='col-12'>Ad <span className={styles.error}>*</span>
                                            <span className=''> <ErrorMessage name="name" component="span" className={`${styles.error}`} /></span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Field className={`${styles.inputs}`} type="text" id="name" name="name" />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-12'>Soyad <span className={styles.error}>*</span>
                                            <span className=''> <ErrorMessage name="surname" component="span" className={`${styles.error}`} /></span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Field className={`${styles.inputs}`} type="text" id="surname" name="surname" />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-12'>E-Posta <span className={styles.error}>*</span>
                                            <span className=''> <ErrorMessage name="email" component="span" className={`${styles.error}`} /></span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Field className={`${styles.inputs}`} type="email" id="email" name="email" />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-12'>Telefon <span className={styles.error}>*</span>
                                            <span className=''> <ErrorMessage name="phoneNum" component="span" className={`${styles.error}`} /></span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Field className={`${styles.inputs}`} type="text" id="phoneNum" name="phoneNum" />
                                        </div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-12'>Parola <span className={styles.error}>*</span>
                                            <span className=''> <ErrorMessage name="password" component="span" className={`${styles.error}`} /></span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Field className={`${styles.inputs}`} type="password" id="password" name="password" />
                                        </div>
                                    </div>
                                    <div className='row mt-4'>

                                        <div className='col-6 '>
                                            <button className={`${styles.btnCancel}`} onClick={closeModal} disabled={isSubmitting}>İptal</button>
                                        </div>
                                        <div className='col-6 '>
                                            <button className={`${styles.btn}`} type="submit" disabled={isSubmitting}>Üye Ol</button>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-12 text-center'>
                                            <p style={{ color: "#7A7A7A" }}>
                                                Üye olduğunuzda aydınlatma metninde yer alan kullanım koşullarımızı kabul edersiniz !
                                            </p>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </Form>

                )}

            </Formik>

        </>
    )
}

export default RegisterComponent