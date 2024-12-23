import React, { useEffect, useState } from 'react'
import styles from './styles.module.css';
import { Formik, Field, Form } from 'formik';
import apiService from '../../../../api/apiService';
import { endpoints } from '../../../../api/apiConfig';
import FavoriteCard from '../../../FavoriteCard/FavoriteCard';


interface InfoFormProps {
    email: string;
    phoneNum: string;
    createdAt: string;
}


interface CommentFormProps {
    content: string;
    starCount: number;
}

interface FavoriteModels {
    modelId: number,
    carType: string,
    gearType: string,
    brandName: string,
    modelName: string,
    personCount: number,
    price: string,
    imageDirectory: string
}

function UserProfile() {
    const [initialInfoValues, setInitialInfoValues] = useState<InfoFormProps>();
    const [initialCommentValues, setInitialCommentValues] = useState<CommentFormProps>();
    const [initialFavorites, setinitialFavorites] = useState<FavoriteModels[]>([]);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [isError, setIsError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const InfoResponse = await apiService(endpoints.ownInfo, "GET")
                const CommentResponse = await apiService(endpoints.ownComment, "GET")
                const Favorites = await apiService(endpoints.favorites, "GET")
                setInitialInfoValues(InfoResponse);
                setInitialCommentValues(CommentResponse);
                setinitialFavorites(Favorites);
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

    const removeFavorite = async (id: number) => {
        try {
            console.log(id);
            await apiService(endpoints.favorites, "DELETE", id);
            alert("Favorilerden Kaldırıldı");
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAccount = async () => {
        try {
            await apiService(endpoints.ownAccountDelete, "DELETE");
            alert("OK")
            await apiService(endpoints.logout, "GET");
            localStorage.removeItem("accessToken");
            alert("Çıkış Yapıldı");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            {isError ? (
                <div style={{ color: "red" }}>{isError}</div>
            ) : (
                <div className={`container mt-4 pt-3 `}>

                    <ul className="nav nav-tabs mt-2" role="tablist">
                        <li className="nav-item " >
                            <a className={`${styles.navBtn} nav-link active`} id="disabled-tab-0" data-bs-toggle="tab" href="#disabled-tabpanel-0">Bilgilerim</a>
                        </li>
                        <li className="nav-item" >
                            <a className={`${styles.navBtn} mx-3 nav-link`} id="disabled-tab-1" data-bs-toggle="tab" href="#disabled-tabpanel-1">Favorilerim</a>
                        </li>
                        <li className="nav-item">
                            <a className={`${styles.navBtn} nav-link`} id="disabled-tab-2" data-bs-toggle="tab" href="#disabled-tabpanel-2">Yorumum</a>
                        </li>
                    </ul>

                    <div className="tab-content pt-3" id="tab-content">
                        <div className="tab-pane active" id="disabled-tabpanel-0" role="tabpanel" aria-labelledby="disabled-tab-0">
                            <div className='col'>
                                {initialInfoValues ? (
                                    <div>
                                        <Formik initialValues={initialInfoValues} onSubmit={submitInfoForm} enableReinitialize>
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
                                        <div className='row mt-2 d-flex justify-content-center'>
                                            <button className={`${styles.deleteBtn}`} onClick={deleteAccount}>Hesabımı Sil</button>
                                        </div>
                                    </div>

                                ) : (
                                    <p>Bilgiler yükleniyor...</p>
                                )}
                            </div>
                        </div>
                        <div className="tab-pane" id="disabled-tabpanel-1" role="tabpanel" aria-labelledby="disabled-tab-1">
                            <div className='container mt-4'>
                                <div className={`${styles.modelsList} row overflow-y-scroll`}>
                                    {(
                                        initialFavorites?.map((favorite: FavoriteModels) => {
                                            return (
                                                <div className='col-3 mt-3'>

                                                    <FavoriteCard removeFavorites={removeFavorite} modelId={favorite.modelId}
                                                        brandName={favorite.brandName} carType={favorite.carType} gearType={favorite.gearType}
                                                        imageDirectory={favorite.imageDirectory} modelName={favorite.modelName} personCount={favorite.personCount}
                                                        price={favorite.price}
                                                    />
                                                </div>

                                            )
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane" id="disabled-tabpanel-2" role="tabpanel" aria-labelledby="disabled-tab-2">
                            <div className='container'>
                                <div className='row'>
                                    <div>
                                        {initialCommentValues ? (
                                            <Formik initialValues={initialCommentValues} onSubmit={submitCommentForm} enableReinitialize>
                                                <Form>
                                                    <div className='container'>
                                                        <div className='row'>
                                                            <div className='ps-0 d-flex justify-content-start align-items-center'>
                                                                <p style={{ fontSize: "1.1rem", paddingTop: "5px" }}>Bizi Değerlendir !</p>
                                                                <p className='mx-2'>{[1, 2, 3, 4, 5].map((star) => (
                                                                    <span
                                                                        key={star}
                                                                        onClick={() => setRating(star)}
                                                                        onMouseEnter={() => setHover(star)}
                                                                        onMouseLeave={() => setHover(0)}
                                                                        style={{ cursor: "pointer", color: star <= (hover || rating) ? "gold" : "gray", fontSize: "2rem", }}>
                                                                        ☆
                                                                    </span>
                                                                ))}</p>


                                                            </div>

                                                        </div>
                                                        <div className='row  mt-1'>
                                                            <Field as="textarea" rows={10} id="content" name="content" className={`${styles.comment}`} />
                                                        </div>
                                                        <div className='row  mt-2'>
                                                            <button className={`${styles.btn} mt-4 `} type='submit'>Yorumumu Güncelle</button>
                                                        </div>
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
                </div >
            )
            }
        </>
    )
}

export default UserProfile