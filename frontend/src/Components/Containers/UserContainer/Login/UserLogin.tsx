import React, { useState } from 'react'
import styles from './styles.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import loginValidationSchema from './LoginValidationSchema';
import ListElement from '../../../ListElement/ListElement';
import logo from '../../../../assets/logos/logo-flexper.png';
import Image from '../../../Image/Image';


interface LoginProps {
    email: string;
    password: string;
}

const initialValues = {
    email: '',
    password: ''
}

const onSubmit = async (values: LoginProps, { setSubmitting }: any) => {
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

function UserLogin() {
    return (
        <>
            <Formik initialValues={initialValues} validationSchema={loginValidationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className={`${styles.outerContainer} `}>
                            <div className={`${styles.Form}`}>
                                <div className='container w-100 h-100'>
                                    <div className={`${styles.headerArea} row`}>
                                        <div className='col-6 d-flex justify-content-start align-items-center'>
                                            <p className={`${styles.headerText} ps-1 pt-4`}>Giriş Yap</p>
                                        </div>
                                        <div className='col-6 d-flex justify-content-center pt-2 align-items-center'>
                                            <div>
                                                <Image URL={logo} Width='150px'></Image>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='row '>
                                        <div className='col-12'>E-Posta<span className={styles.error}> *</span>
                                            <span className=''> <ErrorMessage name="email" component="span" className={`${styles.error}`} /></span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Field className={`${styles.inputs}`} type="email" id="email" name="email" />
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-12'>Parola<span className={styles.error}> *</span>
                                            <span className=''> <ErrorMessage name="password" component="span" className={`${styles.error}`} /></span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12'>
                                            <Field className={`${styles.inputs}`} type="text" id="password" name="password" />
                                        </div>
                                    </div>
                                    <div className='row mt-4'>
                                        <div className='col-12 '>
                                            <button className={`${styles.btn}`} type="submit" disabled={isSubmitting}>GİRİŞ YAP</button>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-6 ps-3 d-flex justify-content-start'>
                                            <ListElement href='ParolaSifirla' text={"Şifremi Unuttum"} color='#7a7a7a' fs='0.95rem' isHover={true} hoverColor='#294474' />
                                        </div>
                                    </div>
                                    <div className='row mt-4'>
                                        <div className='col-12 d-flex justify-content-center'>
                                            <p style={{ color: "#7A7A7A", fontWeight: "500" }}>Hesabınız Yok Mu?</p>
                                            <p className='ms-2'>
                                                <ListElement href='ParolaSifirla' text={"Üye Olun"} boldness='600' color='#1A2B48' isHover={true} hoverColor='#294474' />
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

export default UserLogin