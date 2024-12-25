import React from 'react'
import styles from './styles.module.css'
import Image from '../../../../Image/Image'
import dummyImage from '../../../../../assets/images/LandingImages/Mach-e.1920x1080-1920x1080.jpg'
import { Formik, Form, Field } from 'formik'
import apiService from '../../../../../api/apiService'
import { endpoints } from '../../../../../api/apiConfig'


interface ItemProp {
    Item: {
        id: number,
        carType: {
            id: number,
            car: string
        },
        fuelType: {
            id: number,
            fuel: string
        },
        gearType: {
            id: number,
            gear: string
        },
        brandName: string,
        modelName: string,
        description: string,
        personCount: number,
        luggageCount: number,
        doorCount: number,
        price: number,
        otherServices: [
        ],
        otherFeatures: [
        ],
        imageDirectory: string,
    }
    Gears: {
        id: number;
        gear: string;
    }[];
    Fuels: {
        id: number;
        fuel: string;
    }[];
    CarTypes: {
        id: number;
        car: string;
    }[];
}

//gönderilen veriler üzerinde tip denemesi yapılabilir | pipe ile ayrılıp ayrı bir interface ile 
const onSubmitHandler = async (values: any) => {
    try {
        const otherServicesArray = typeof values.otherServices === 'string' ? values.otherServices.split(',') : values.otherServices;
        const otherFeaturesArray = typeof values.otherFeatures === 'string' ? values.otherFeatures.split(',') : values.otherServices;
        const dataToSend = {
            fuelTypeId: Number(values.fuelType.id),
            gearTypeId: Number(values.gearType.id),
            carTypeId: Number(values.carType.id),
            brandName: values.brandName,
            modelName: values.modelName,
            description: values.description,
            personCount: values.personCount,
            luggageCount: values.luggageCount,
            doorCount: values.doorCount,
            price: values.price,
            otherServices: otherServicesArray || [],
            otherFeatures: otherFeaturesArray || [],
            imageDirectory: values.imageDirectory,
        };
        await apiService(endpoints.models + `${values.id}`, "PUT", dataToSend)
        alert("ok")
    } catch (error) {
        console.log("Veri Güncellenirken Hata: ", error)
        alert("error")
    }

}



function ModelEditCard({ Item, Gears, Fuels, CarTypes }: ItemProp) {
    return (
        <>

            <div className='col-3 my-4'>
                <Formik initialValues={Item} onSubmit={onSubmitHandler} enableReinitialize>
                    <Form>
                        <div className='container'>

                            <div className='row border'>
                                <Image URL={dummyImage} Width='200px' />
                            </div>

                            <div className='row'>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <div className={`col border justify-content-center d-flex flex-column align-items-center`}>
                                            <div className='row'><label htmlFor='fuelType.fuel'>Yakıt</label></div>
                                            <div className='row'>
                                                <Field as="select" className={`${styles.inputs} text-center`} name="fuelType.id" id="fuelType.id" >
                                                    {Fuels.map((fuel) => (
                                                        <option key={fuel.id} value={fuel.id}>
                                                            {fuel.fuel}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                        </div>
                                        <div className={`col border justify-content-center d-flex flex-column align-items-center`}>
                                            <div className='row'><label htmlFor='gearType.gear'>Şanzıman</label></div>
                                            <div className='row'>
                                                <Field as="select" className={`${styles.inputs} text-center`} name="gearType.id" id="gearType.id" >
                                                    {Gears.map((gear) => (
                                                        <option key={gear.id} value={gear.id}>
                                                            {gear.gear}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                        </div>
                                        <div className={`col border justify-content-center d-flex flex-column align-items-center`}>
                                            <div className='row'><label htmlFor='carType.car'>Tip</label></div>
                                            <div className='row'>
                                                <Field as="select" className={`${styles.inputs} text-center`} name="carType.id" id="carType.id" >
                                                    {CarTypes.map((cartype) => (
                                                        <option key={cartype.id} value={cartype.id}>
                                                            {cartype.car}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                        </div>
                                        <div className={`col border justify-content-center d-flex flex-column align-items-center`}>
                                            <div className='row'><label htmlFor='brandName'>Marka</label></div>
                                            <div className='row'><Field className={`${styles.inputs} text-center`} name="brandName" id="brandName" /></div>
                                        </div>
                                        <div className={`col border justify-content-center d-flex flex-column align-items-center`}>
                                            <div className='row'><label htmlFor='modelName'>Model</label></div>
                                            <div className='row'><Field className={`${styles.inputs} text-center`} name="modelName" id="modelName" /></div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className={`col-12 border justify-content-center`}>
                                            <div className='row text-center'><label htmlFor='description'>Açıklama</label></div>
                                            <div className='row'><Field className={`${styles.inputs} text-center`} name="description" id="description" /></div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className={`border col-4 justify-content-center`}>
                                            <div className='row text-center'><label htmlFor='personCount'>Kişi Sayısı</label></div>
                                            <div className='row'><Field className={`${styles.inputs} text-center`} name="personCount" id="personCount" /></div>
                                        </div>
                                        <div className={`border col-4 justify-content-center`}>
                                            <div className='row text-center'><label htmlFor='luggageCount'>Bagaj Sayısı</label></div>
                                            <div className='row'><Field className={`${styles.inputs} text-center`} name="luggageCount" id="luggageCount" /></div>
                                        </div>
                                        <div className={`border col-4 justify-content-center`}>
                                            <div className='row text-center'><label htmlFor='doorCount'>Kapı Sayısı</label></div>
                                            <div className='row'><Field className={`${styles.inputs} text-center`} name="doorCount" id="doorCount" /></div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className={`col-12 border justify-content-center`}>
                                            <div className='row text-center'><label htmlFor='price'>Aylık Kiralama Bedeli</label></div>
                                            <div className='row'> <Field className={`${styles.inputs} text-center`} name="price" id="price" /></div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className={`col-12 border justify-content-center`}>
                                            <div className='row text-center'><label htmlFor='otherServices'>Sunulan Diğer Hizmetler</label></div>
                                            <div className='row'>  <Field className={`${styles.inputs}`} name="otherServices" id="otherServices" /></div>
                                        </div>
                                    </div>
                                    <div className='row '>
                                        <div className={`col-12 border justify-content-center`}>
                                            <div className='row text-center'><label htmlFor='otherFeatures'>Diğer Araç Özellikleri</label></div>
                                            <div className='row'> <Field className={`${styles.inputs}`} name="otherFeatures" id="otherFeatures" /></div>
                                        </div>
                                    </div>
                                    <div className='row border'>
                                        <div className={`col-12 border justify-content-center`}>
                                            <div className='row text-center'>
                                                <button type='submit' className={styles.btn}>Güncelle</button>

                                            </div>
                                            <div className='row mt-2'>
                                                <button className={styles.deleteBtn}>Sil</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>



        </>
    )
}

export default ModelEditCard