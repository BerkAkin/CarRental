import styles from './styles.module.css';
import { useModelsContext } from '../../Contexts/ModelsContext';
import ModelCard from '../ModelCard/ModelCard';
import { useCallback, useState } from 'react';
import { Formik, Form, Field } from 'formik';


interface ISearchForm {
    query: string
}


function ModelsComponent() {

    const { error, models, HandleNextModelPage, HandlePreviousModelPage, handleSearch } = useModelsContext();

    const SearchInitialValues: ISearchForm = {
        query: ""
    }

    const handleSearchSubmit = useCallback(async (values: any) => {
        handleSearch(values.searchText);
    }, []);

    if (error) return <p>{error}</p>


    return (
        <>


            <div className={`container mt-4 pt-3`}>
                <div className='row'>
                    <h2 style={{ color: "#7A7A7A" }}>Modeller</h2>
                    <hr></hr>
                </div>
                <div className={`row mt-4`}>
                    <div className='col-2  mt-4 p-0'>
                        <div className={`${styles.searchCard} `}>
                            <Formik initialValues={SearchInitialValues} onSubmit={handleSearchSubmit}>
                                <Form>
                                    <div className='text-center pt-2 fs-5'><label htmlFor='searchText'>Model Arama</label></div>
                                    <div className={`${styles.searchWrapper} p-2 `}>
                                        <Field placeholder="Marka ya da model girin" className={`${styles.inputAreas} ps-1`} name="searchText" />
                                    </div>
                                    <div className='d-flex justify-content-center p-2'>
                                        <button className={`${styles.btn} w-100 `} type='submit'>Ara</button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>

                    </div>
                    <div className='col-10'>
                        <div className='row'>
                            {models?.data.map((model: any) => (
                                <div className='col-3 mt-4' key={model.id}>
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
                                    />
                                </div>
                            ))}

                        </div>

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