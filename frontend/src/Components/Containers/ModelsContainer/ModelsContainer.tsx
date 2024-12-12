import React, { useEffect, useState } from 'react'
import ModelCard from './ModelCard/ModelCard'
import apiService from '../../../api/apiService';
import { endpoints } from '../../../api/apiConfig';
import styles from './styles.module.css';


interface ModelsSummariesState {
    totalRecords: number,
    totalPages: number,
    currentPage: number,
    data: [
        {
            id: number,
            carType: {
                id: number,
                car: string
            },
            gearType: {
                id: number,
                gear: string
            },
            brandName: string,
            modelName: string,
            personCount: number,
            luggageCount: number,
            doorCount: number,
            price: number,
            imageDirectory: string
        }
    ]
}

function ModelsContainer() {


    const [models, setModels] = useState<ModelsSummariesState>();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getModels = async () => {
            try {
                const data = await apiService(endpoints.modelSummaries, "GET", null, `?pageNumber=${currentPage}`);
                setModels(data);
                console.log(models);
            } catch (error) {
                console.log("Modeller alınırken hata:", error);
            }
        }
        getModels();
    }, [currentPage])


    const HandleNextPage = () => {
        if (currentPage < (models?.totalPages || 1)) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
    const HandlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    return (
        <>
            <div className='container mt-4 pt-3'>
                <div className='row'>
                    <h2 style={{ color: "#7A7A7A" }}>Modeller</h2>
                </div>
                <div className='row'>


                    {models?.data.map((model) => (
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

                    <div className='mt-4 d-flex justify-content-end '>
                        <div>
                            <button className={`${styles.btn}`} onClick={HandlePreviousPage}>Önceki Sayfa</button>
                        </div>
                        <div className='me-1 ms-3'>
                            <button className={`${styles.btn}`} onClick={HandleNextPage}>Sonraki Sayfa</button>
                        </div>


                    </div>

                </div>
            </div>

        </>
    )
}

export default ModelsContainer