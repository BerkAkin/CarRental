import styles from './styles.module.css';
import { useModelsContext } from '../../Contexts/ModelsContext';
import ModelCard from '../ModelCard/ModelCard';
import { useCallback, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Skeleton from '../Skeletons/Skeleton/Skeleton';
import SkeletonCard from '../Skeletons/SkeletonCard/SkeletonCard';


interface ISearchForm {
    query: string
}


function ModelsComponent() {

    const { error, models, isLoading, HandleNextModelPage, HandlePreviousModelPage, handleSearch } = useModelsContext();

    const SearchInitialValues: ISearchForm = {
        query: ""
    }

    const handleSearchSubmit = useCallback(async (values: any) => {
        handleSearch(values.searchText);
    }, []);

    if (error) return <p>{error}</p>


    return (
        <>


            <div className={`${styles.mainContainer} container my-lg-4 py-3`}>
                {/* <div className='row'>
                    <h2 style={{ color: "#7A7A7A" }}>Modeller</h2>
                    <hr></hr>
                </div> */}
                <div className={`row my-lg-4`}>
                    <div className='col-12 col-lg-2 mt-lg-4 p-0'>
                        <div className={`${styles.searchCard} `}>
                            <Formik initialValues={SearchInitialValues} onSubmit={handleSearchSubmit}>
                                <Form>
                                    <div className='text-center pt-2 fs-5'><label htmlFor='searchText'>Araç Ara</label></div>
                                    <div className={`${styles.searchWrapper} p-2 `}>
                                        <Field placeholder="Marka ya da model" className={`${styles.inputAreas} ps-1`} name="searchText" />
                                    </div>
                                    <div className='d-flex justify-content-center p-2'>
                                        <button className={`${styles.btn} w-100 `} type='submit'>Ara</button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>

                    </div>
                    <div className={`${styles.modelWrapperInside} col-lg-10 col-12`}>
                        {isLoading ?
                            <div className='row'>
                                <div className='col-sm-6 col-lg-4 col-xl-4 col-xxl-3 col-12 mt-4'>
                                    <SkeletonCard />
                                </div>
                                <div className='col-sm-6 col-lg-4 col-xl-4 col-xxl-3 col-12 mt-4'>
                                    <SkeletonCard />
                                </div>
                                <div className='col-sm-6 col-lg-4 col-xl-4 col-xxl-3 col-12 mt-4'>
                                    <SkeletonCard />
                                </div>
                                <div className='col-sm-6 col-lg-4 col-xl-4 col-xxl-3 col-12 mt-4'>
                                    <SkeletonCard />
                                </div>
                            </div>
                            :
                            <div className='row'>
                                {models?.data.map((model: any) => (
                                    <div className='col-sm-6 col-lg-4 col-xl-4 col-xxl-3 col-12 mt-4' key={model.id}>
                                        <ModelCard
                                            price={model.price.toString()}
                                            brandName={model.brandName}
                                            type={model.carType.car}
                                            doorCount={model.doorCount}
                                            gear={model.gearType.gear}
                                            luggageCount={model.luggageCount}
                                            personCount={model.personCount}
                                            image={model.imageDirectory}
                                            id={model.id}
                                            slug={model.slug}
                                        />
                                    </div>
                                ))}
                            </div>
                        }
                    </div>

                    {
                        models ?
                            <div className='mt-4 d-flex justify-content-end '>
                                <div>
                                    <button className={`${styles.btn}`} onClick={HandlePreviousModelPage}>Önceki Sayfa</button>
                                </div>
                                <div className='me-1 ms-3'>
                                    <button className={`${styles.btn}`} onClick={HandleNextModelPage}>Sonraki Sayfa</button>
                                </div>
                            </div>
                            :
                            <></>
                    }



                </div>
            </div>
        </>
    )
}

export default ModelsComponent