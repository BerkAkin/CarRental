import React, { useEffect, useState } from 'react'
import styles from './styles.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import loginValidationSchema from './LoginValidationSchema';
import ListElement from '../../../ListElement/ListElement';
import logo from '../../../../assets/logos/logo-flexper.png';
import Image from '../../../Image/Image';
import apiService from '../../../../api/apiService';
import { endpoints } from '../../../../api/apiConfig';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../../Contexts/AuthContext';


interface LoginProps {
    email: string;
    password: string;
}

const initialValues = {
    email: '',
    password: ''
}


function UserLogin() {

    const { fetchUserType } = useAuthContext();
    const navigate = useNavigate();



    const onSubmit = async (values: LoginProps, { setSubmitting }: any) => {
        try {
            const response = await apiService(endpoints.login, "POST", values)
            setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);
            localStorage.setItem("accessToken", response);
            await fetchUserType();
            alert("Giriş Yapıldı");

        } catch (error) {
            console.error(error);
        }
        finally {
            setSubmitting(false);
        }
    };


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