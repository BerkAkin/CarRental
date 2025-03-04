import React, { useEffect, useState } from 'react'
import styles from './styles.module.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import apiService from '../../api/apiService';
import { endpoints } from '../../api/apiConfig';
import FavoriteCard from '../../Components/FavoriteCard/FavoriteCard';
import { UserInfoContextProvider } from '../../Contexts/UserInfoContext';
import UserProfileComponent from '../../Components/UserProfileComponent/UserProfileComponent';
import { useToastManagerContext } from '../../Contexts/ToastManagerContext';
import { StatusHandler } from '../../common/StatusHandler';
import ConfirmationPopup from '../../Components/ConfirmationPopup/ConfirmationPopup';
import { useConfirmContext } from '../../Contexts/ConfirmationContext';
import userCommentValidationSchema from './UserCommentValidationSchema';
import SkeletonCard from '../../Components/Skeletons/SkeletonCard/SkeletonCard';
import Skeleton from '../../Components/Skeletons/Skeleton/Skeleton';


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
    imageDirectory: string,
    slug: string,
}

function UserPage() {
    const { showToast } = useToastManagerContext();
    const { showConfirmation } = useConfirmContext();


    const [initialCommentValues, setInitialCommentValues] = useState<CommentFormProps>();
    const [initialFavorites, setinitialFavorites] = useState<FavoriteModels[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [error, setError] = useState("");

    const fetchUserData = async () => {
        try {
            const { data: dataC, status: statusC }: any = await apiService(endpoints.ownComment, "GET")
            const { data: dataF, status: statusF }: any = await apiService(endpoints.favorites, "GET")

            setInitialCommentValues(dataC);
            setinitialFavorites(dataF);
            setRating(dataC.starCount);
        } catch (error) {
            setError("Kullanıcı yüklenirken bir hata meydana geldi. Lütfen yöneticinize başvurun");

        }
        finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {

        fetchUserData();
    }, [])



    const submitCommentForm = async (values: CommentFormProps) => {
        values.starCount = rating;
        showConfirmation("Yorum güncellenecektir. Devam edilsin mi?", async () => {
            try {
                const { data, status }: any = await apiService(endpoints.ownComment, "PUT", values);
                StatusHandler(status, data, showToast)
            } catch (error) {
                const { status, message }: any = error;
                StatusHandler(status, message, showToast)
            }
        })
    }

    const removeFavorite = async (id: number) => {
        try {
            const { data, status }: any = await apiService(endpoints.favorites, "DELETE", id);
            StatusHandler(status, data, showToast)
            fetchUserData();
        } catch (error) {
            const { status, message }: any = error;
            StatusHandler(status, message, showToast)
            fetchUserData();
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

    if (error) return <p>{error}</p>

    return (

        <>
            <ConfirmationPopup />
            <div className={`container-fluid mt-4`}>
                <div className='row'>
                    <div className='col-md-2 col-12 border-end'>
                        <ul className="nav nav-tabs  d-md-flex flex-md-column border-none" role="tablist">
                            <li className="nav-item " >
                                <a className={`${styles.navBtn} nav-link active`} id="disabled-tab-0" data-bs-toggle="tab" href="#disabled-tabpanel-0">Bilgilerim</a>
                            </li>
                            <li className="nav-item" >
                                <a className={`${styles.navBtn} nav-link`} id="disabled-tab-1" data-bs-toggle="tab" href="#disabled-tabpanel-1">Favorilerim</a>
                            </li>
                            <li className="nav-item">
                                <a className={`${styles.navBtn} nav-link`} id="disabled-tab-2" data-bs-toggle="tab" href="#disabled-tabpanel-2">Yorumum</a>
                            </li>
                        </ul>
                    </div>
                    <div className={`${styles.sectionBG} col-12 col-md-10`}>
                        <div className="tab-content pt-3" id="tab-content">
                            <div className="tab-pane active" id="disabled-tabpanel-0" role="tabpanel" aria-labelledby="disabled-tab-0">
                                <div className='container-fluid'>
                                    <div className='row pt-3'><h3>Bilgilerim</h3><hr /></div>
                                    <div className='row'>
                                        <UserInfoContextProvider>
                                            <UserProfileComponent />
                                        </UserInfoContextProvider>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="disabled-tabpanel-1" role="tabpanel" aria-labelledby="disabled-tab-1">
                                <div className='container-fluid'>
                                    <div className='row pt-3'><h3>Favorilerim</h3><hr /></div>
                                    {isLoading ?
                                        <div className={`${styles.modelsList, styles.bgColor} row overflow-y-scroll border my-2 p-3`}>
                                            <div className='col-sm-6 col-lg-4 col-xxl-2 col-12 mt-3'>
                                                <SkeletonCard />
                                            </div>
                                            <div className='col-sm-6 col-lg-4 col-xxl-2 col-12 mt-3'>
                                                <SkeletonCard />
                                            </div>
                                        </div>
                                        :
                                        <div className={`${styles.modelsList, styles.bgColor} row overflow-y-scroll border my-2 p-3`}>
                                            {(
                                                initialFavorites?.map((favorite: FavoriteModels) => {
                                                    return (

                                                        <div className='col-sm-6 col-lg-4 col-xxl-2 col-12 mt-3'>

                                                            <FavoriteCard removeFavorites={removeFavorite} modelId={favorite.modelId}
                                                                brandName={favorite.brandName} carType={favorite.carType} gearType={favorite.gearType}
                                                                imageDirectory={favorite.imageDirectory} modelName={favorite.modelName} personCount={favorite.personCount}
                                                                price={favorite.price} slug={favorite.slug}
                                                            />
                                                        </div>

                                                    )
                                                })
                                            )}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="tab-pane" id="disabled-tabpanel-2" role="tabpanel" aria-labelledby="disabled-tab-2">
                                <div className='container-fluid'>
                                    <div className='row pt-3'><h3>Yorumum</h3><hr /></div>

                                    <div className={`${styles.modelsList, styles.bgColor} row border my-2 p-3`}>
                                        <div>
                                            {initialCommentValues ? (
                                                <Formik validationSchema={userCommentValidationSchema} initialValues={initialCommentValues} onSubmit={submitCommentForm} enableReinitialize>
                                                    {({ handleSubmit }) => (
                                                        <div className='table-responsive'>
                                                            <table className={`${styles.tableFontSize} table-striped table-hover table mt-3`}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Yorum İçeriği</th>
                                                                        <th>Deneyim</th>
                                                                        <th>İşlemler</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className='col-10 border'>
                                                                            <ErrorMessage name="content" component="span" className={`${styles.error}`} />
                                                                            <Field as="textarea" rows={2} id="content" name="content" className={`${styles.comment}`} />
                                                                        </td>
                                                                        <td className='col-1 border'>
                                                                            <div className='mt-2'>{[1, 2, 3, 4, 5].map((star) => (
                                                                                <span
                                                                                    key={star}
                                                                                    onClick={() => setRating(star)}
                                                                                    onMouseEnter={() => setHover(star)}
                                                                                    onMouseLeave={() => setHover(0)}
                                                                                    style={{ cursor: "pointer", color: star <= (hover || rating) ? "gold" : "gray", fontSize: "2rem", }}>
                                                                                    ☆
                                                                                </span>
                                                                            ))}</div>
                                                                        </td>
                                                                        <td className='col border'>
                                                                            <button className={`${styles.btn} mt-3`} type='button' onClick={() => handleSubmit()}>Güncelle</button>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </div>
                                                    )}



                                                </Formik>
                                            ) : (
                                                <div className={`${styles.modelsList, styles.bgColor} row border my-2 p-3`}>
                                                    <div>
                                                        <Skeleton />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
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