import React, { useEffect, useState } from 'react'
import styles from './styles.module.css';
import { Formik, Field, Form } from 'formik';
import apiService from '../../../api/apiService';
import { endpoints } from '../../../api/apiConfig';


interface InfoFormProps {
    email: string;
    phoneNum: string;
    createdAt: string;
}


interface CommentFormProps {
    content: string;
    starCount: number;
}

function UserProfile() {
    const [initialInfoValues, setInitialInfoValues] = useState<InfoFormProps>();
    const [initialCommentValues, setInitialCommentValues] = useState<CommentFormProps>();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [isError, setIsError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const InfoResponse = await apiService(endpoints.ownInfo, "GET")
                const CommentResponse = await apiService(endpoints.ownComment, "GET")
                setInitialInfoValues(InfoResponse);
                setInitialCommentValues(CommentResponse);
                setRating(CommentResponse.starCount);
            } catch (error) {

                setIsError("Hata oluştu");
            }

        }
        fetchUserData();
    }, [])

    const submitInfoForm = async (values: InfoFormProps) => {
        try {
            const response = await apiService(endpoints.ownInfo, "PUT", values);
            alert("Bilgiler Güncellendi")
        } catch (error) {
            console.log(error);
        }


    }

    const submitCommentForm = async (values: CommentFormProps) => {
        values.starCount = rating;
        try {
            const response = await apiService(endpoints.ownComment, "PUT", values);
            alert("Yorum Güncellendi")
        } catch (error) {
            console.log(error);
        }


    }

    return (
        <>
            {isError ? (
                <div style={{ color: "red" }}>{isError}</div>
            ) : (
                <div className={`container mt-4 pt-3  ${styles.mainContainer}`}>
                    <div className='row'>
                        <div className='col-12'>
                            <h2 className={styles.headerColor}>Profilim</h2>
                        </div>
                        <div className={`${styles.subContainer} container pt-4`}>
                            <div className='row h-100'>
                                {initialInfoValues ? (
                                    <Formik initialValues={initialInfoValues} onSubmit={submitInfoForm} enableReinitialize>

                                        <div className='col-2 border-end'>
                                            <div className='row'>
                                                <h4 className={styles.headerColor}>Bilgilerim</h4>
                                            </div>
                                            <div className='row'>
                                                <div></div>
                                            </div>

                                            <Form>
                                                <div className='row mt-3 border-bottom'>
                                                    <label>E-Posta</label>
                                                    <Field className={`${styles.infos} mx-auto`} id="email" name="email" />
                                                </div>
                                                <div className='row mt-3 border-bottom'>
                                                    <label>Telefon Numarası</label>

                                                    <Field className={`${styles.infos} mx-auto`} id="phoneNum" name="phoneNum" />
                                                </div>
                                                <div className='row mt-3 border-bottom'>
                                                    <label>Katılma Tarihi</label>
                                                    <Field className={`${styles.infos} mx-auto`} id="createdAt" name="createdAt" />
                                                </div>
                                                <div className='row mt-5'>Şifre Değiştir</div>
                                                <div className='row'>Hesabımı Dondur</div>
                                                <div>
                                                    <button type='submit'>Bilgilerimi Değiştir</button>
                                                </div>
                                            </Form>
                                        </div>
                                    </Formik>
                                ) : (
                                    <p>Bilgiler yükleniyor...</p>
                                )}


                                <div className='col-10'>
                                    <div className='container h-50'>
                                        <h4 className={styles.headerColor}>Favorilerim</h4>
                                    </div>
                                    <div className='container border-top h-50'>
                                        <h4 className={styles.headerColor}>Yorumum</h4>
                                        <div className='row'>
                                            <div className=''>
                                                {initialCommentValues ? (
                                                    <Formik initialValues={initialCommentValues} onSubmit={submitCommentForm} enableReinitialize>
                                                        <Form>
                                                            <div className='row'>
                                                                <Field as="textarea" rows={3} style={{ resize: "none", height: "100%" }} id="content" name="content" className={`${styles.infos}`} />
                                                            </div>
                                                            <div className='row mt-3'>
                                                                <div>
                                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                                        <span
                                                                            key={star}
                                                                            onClick={() => setRating(star)}
                                                                            onMouseEnter={() => setHover(star)}
                                                                            onMouseLeave={() => setHover(0)}
                                                                            style={{
                                                                                cursor: "pointer", color: star <= (hover || rating) ? "gold" : "gray", fontSize: "2rem",
                                                                            }}>
                                                                            ☆
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                                <button type='submit'>Yorumumu Güncelle</button>


                                                            </div>
                                                        </Form>
                                                    </Formik>
                                                ) : (
                                                    <p>Bilgiler yükleniyor...</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>


                    </div>
                </div >
            )
            }
        </>
    )
}

export default UserProfile