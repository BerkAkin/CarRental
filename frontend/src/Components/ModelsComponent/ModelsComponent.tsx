import styles from './styles.module.css';
import { useModelsContext } from '../../Contexts/ModelsContext';
import ModelCard from '../ModelCard/ModelCard';


function ModelsComponent() {

    const { models, HandleNextModelPage, HandlePreviousModelPage } = useModelsContext();

    return (
        <>
            <div className='container mt-4 pt-3'>
                <div className='row'>
                    <h2 style={{ color: "#7A7A7A" }}>Modeller</h2>
                </div>
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

                    <div className='mt-4 d-flex justify-content-end '>
                        <div>
                            <button className={`${styles.btn}`} onClick={HandlePreviousModelPage}>Önceki Sayfa</button>
                        </div>
                        <div className='me-1 ms-3'>
                            <button className={`${styles.btn}`} onClick={HandleNextModelPage}>Sonraki Sayfa</button>
                        </div>


                    </div>

                </div>
            </div>

        </>
    )
}

export default ModelsComponent