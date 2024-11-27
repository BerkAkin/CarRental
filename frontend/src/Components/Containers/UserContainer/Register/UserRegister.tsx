import React, { useState } from 'react'
import styles from './styles.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import registerValidationSchema from './RegisterValidationSchema';
import ListElement from '../../../ListElement/ListElement';
import Image from '../../../Image/Image';
import logo from '../../../../assets/logos/logo-flexper.png';


interface RegisterProps {
    name: string;
    surname: string;
    email: string;
    phoneNum: string;
    password: string;
}

const initialValues = {
    email: '',
    password: '',
    name: '',
    surname: '',
    phoneNum: ''
}

const onSubmit = async (values: RegisterProps, { setSubmitting }: any) => {
    //BURADA İSTEK ATILIP GİRİŞ YAPILMA OLAYLARI BAŞLATILACAK
    try {
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
        }, 2000);
    } catch (error) {
        console.error(error);
    }
    finally {
        setSubmitting(false);
    }
};

function UserRegister() {
    return (
        <>
            <Formik initialValues={initialValues} validationSchema={registerValidationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className={`${styles.outerContainer} `}>
                            <div className={`${styles.Form}`}>
                                <div className='container w-100 h-100'>
                                    <div className={`${styles.headerArea} row`}>
                                        <div className='col-6 d-flex justify-content-start align-items-center'>
                                            <p className={`${styles.headerText} ps-1 pt-4`}>Üye Ol</p>
                                        </div>
                                        <div className='col-6 d-flex justify-content-center pt-2 align-items-center'>
                                            <div>
                                                <Image URL={logo} Width='150px'></Image>
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
                                    <div className='row mt-3'>
                                        <div className='col-12'>Soyad <span className={styles.error}>*</span>
                                            <span className=''> <ErrorMessage name="surname" component="span" className={`${styles.error}`} /></span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Field className={`${styles.inputs}`} type="text" id="surname" name="surname" />
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-12'>E-Posta <span className={styles.error}>*</span>
                                            <span className=''> <ErrorMessage name="email" component="span" className={`${styles.error}`} /></span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Field className={`${styles.inputs}`} type="email" id="email" name="email" />
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-12'>Telefon <span className={styles.error}>*</span>
                                            <span className=''> <ErrorMessage name="phoneNum" component="span" className={`${styles.error}`} /></span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Field className={`${styles.inputs}`} type="text" id="phoneNum" name="phoneNum" />
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-12'>Parola <span className={styles.error}>*</span>
                                            <span className=''> <ErrorMessage name="password" component="span" className={`${styles.error}`} /></span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Field className={`${styles.inputs}`} type="text" id="password" name="password" />
                                        </div>
                                    </div>
                                    <div className='row mt-5'>
                                        <div className='col-12 '>
                                            <button className={`${styles.btn}`} type="submit" disabled={isSubmitting}>ÜYE OL</button>
                                        </div>
                                    </div>
                                    <div className='row mt-4'>
                                        <div className='col-12 text-center'>
                                            <p style={{ color: "#7A7A7A" }}>
                                                Üye olduğunuzda aydınlatma metninde yer alan kullanım koşullarımızı kabul edersiniz !
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row mt-1'>
                                        <div className='col-12 d-flex justify-content-center'>
                                            <p style={{ color: "#7A7A7A", fontWeight: "500" }}>Hesabınız Var Mı?</p>
                                            <p className='ms-2'>
                                                <ListElement href='' text={"Giriş Yapın"} boldness='600' color='#1A2B48' isHover={true} hoverColor='#294474' />
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

export default UserRegister