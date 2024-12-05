import React from 'react'
import ModelCard from './ModelCard/ModelCard'
import dummyImage from '../../../assets/dummyImg/img'


/* Burada araçlara istek atılacak paginaiton yapılacak aşağı kaydırdıkça çalışan ya da butonla  */
function ModelsContainer() {
    return (
        <>
            <div className='container mt-4 pt-3'>
                <div className='row'>
                    <h2 style={{ color: "#7A7A7A" }}>Modeller</h2>
                </div>
                <div className='row mt-4'>

                    <div className='col-3'>
                        <ModelCard
                            price="32,900"
                            brandName='Ford Tourneo Courier'
                            type='Kamyonet' doorCount={4} gear="Manuel"
                            luggageCount={4} personCount={4}
                            image={dummyImage.img} id={1232}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default ModelsContainer