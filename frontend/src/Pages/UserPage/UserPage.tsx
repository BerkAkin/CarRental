import React, { useEffect, useState } from 'react'
import styles from './styles.module.css';
import { Formik, Field, Form } from 'formik';
import apiService from '../../api/apiService';
import { endpoints } from '../../api/apiConfig';
import FavoriteCard from '../../Components/FavoriteCard/FavoriteCard';
import { UserInfoContextProvider } from '../../Contexts/UserInfoContext';
import UserProfileComponent from '../../Components/UserProfileComponent/UserProfileComponent';
import { useToastManagerContext } from '../../Contexts/ToastManagerContext';


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

function UserPage() {
    const { showToast } = useToastManagerContext();


    const [initialCommentValues, setInitialCommentValues] = useState<CommentFormProps>();
    const [initialFavorites, setinitialFavorites] = useState<FavoriteModels[]>([]);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const CommentResponse = await apiService(endpoints.ownComment, "GET")
                const Favorites = await apiService(endpoints.favorites, "GET")

                setInitialCommentValues(CommentResponse);
                setinitialFavorites(Favorites);
                setRating(CommentResponse.starCount);
            } catch (error) {
                setError("Kullanıcı yüklenirken bir hata meydana geldi. Lütfen yöneticinize başvurun");

            } finally {
                setLoading(false);
            }

        }
        fetchUserData();
    }, [])



    const submitCommentForm = async (values: CommentFormProps) => {
        values.starCount = rating;
        try {
            const response = await apiService(endpoints.ownComment, "PUT", values);
            showToast("Yorum Güncellendi (Yorumun görünür olması için onaylanmalıdır)", "s")
        } catch (error) {
            console.log(error);
            showToast("Yorum Güncellenemedi", "d")
        }


    }

    const removeFavorite = async (id: number) => {
        try {
            console.log(id);
            await apiService(endpoints.favorites, "DELETE", id);
            showToast("Araç Favorilerden Kaldırıldı", "s")
        } catch (error) {
            console.log(error);
            showToast("Araç Favorilerden Kaldırılamadı", "d")
        }
    }

    const deleteAccount = async () => {
        try {
            await apiService(endpoints.ownAccountDelete, "DELETE");
            await apiService(endpoints.logout, "GET");
            localStorage.removeItem("accessToken");
            showToast("Çıkış Yapıldı ve Hesap Askıya Alındı", "s")
            window.location.reload();
        } catch (error) {
            console.log(error);
            showToast("Hesap Askıya Alınamadı", "s")
        }
    }

    if (loading) return <p>Yükleniyor</p>
    if (error) return <p>{error}</p>

    return (

        <>
            <div className={`container-fluid mt-4 pt-3 `}>

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
                        <div className='container'>
                            <UserInfoContextProvider>
                                <UserProfileComponent />
                            </UserInfoContextProvider>
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
        </>
    )
}

export default UserPage