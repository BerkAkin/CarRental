import React, { useContext } from 'react'
import styles from "./styles.module.css"
import { useTypesContext } from '../../../Contexts/TypesContext'
import { Field, Form, Formik } from 'formik'
import Image from '../../Image/Image'
import apiService from '../../../api/apiService'
import { endpoints } from '../../../api/apiConfig'
import dummyImage from '../../../assets/images/LandingImages/Mach-e.1920x1080-1920x1080.jpg'
import { useToastManagerContext } from '../../../Contexts/ToastManagerContext'
import { StatusHandler } from '../../../common/StatusHandler'



interface AddNewCarProps {
    fuelTypeId: number,
    gearTypeId: number,
    carTypeId: number,
    brandName: string,
    modelName: string,
    description: string,
    personCount: number,
    luggageCount: number,
    doorCount: number,
    price: number,
    otherServices: string,
    otherFeatures: string,
    imageDirectory: string
}



function AdminModelAddComponent() {
    const { showToast } = useToastManagerContext();

    const addNewCarSubmitHandler = async (values: AddNewCarProps) => {
        try {
            const dataToSend = {
                fuelTypeId: Number(values.fuelTypeId),
                gearTypeId: Number(values.gearTypeId),
                carTypeId: Number(values.carTypeId),
                brandName: values.brandName,
                modelName: values.modelName,
                description: values.description,
                personCount: Number(values.personCount),
                luggageCount: Number(values.luggageCount),
                doorCount: Number(values.doorCount),
                price: Number(values.price),
                otherServices: values.otherServices.split(",") || [],
                otherFeatures: values.otherFeatures.split(",") || [],
                imageDirectory: values.imageDirectory,
            };
            const { data, status }: any = await apiService(endpoints.models, "POST", dataToSend);
            StatusHandler(status, data, showToast)
        } catch (error) {
            const { status, message }: any = error;
            StatusHandler(status, message, showToast)
        }
    }

    const initialValuesOfAddCar: AddNewCarProps = {
        fuelTypeId: 0,
        gearTypeId: 0,
        carTypeId: 0,
        brandName: "",
        modelName: "",
        description: "",
        personCount: 0,
        luggageCount: 0,
        doorCount: 0,
        price: 0,
        otherServices: "",
        otherFeatures: "",
        imageDirectory: ""
    }

    const { gears, fuels, carTypes } = useTypesContext()
    return (
        <>
            <Formik initialValues={initialValuesOfAddCar} onSubmit={addNewCarSubmitHandler}>
                <Form>
                    <div className='container-fluid border my-4 p-0'>
                        <div className='row m-0 p-0'>
                            <div className='col-4 '>
                                <Image URL={dummyImage} Width='600px'></Image>
                            </div>
                            <div className='col-8  p-0'>
                                <div className='container-fluid h-100'>
                                    <div className='row'>

                                        <div className={`col-6 border`}>
                                            <div className='row text-center'><label htmlFor='brandName'>Marka</label></div>
                                            <div className='row'><Field className={`${styles.inputs} text-center`} name="brandName" id="brandName" /></div>
                                        </div>
                                        <div className={`col-6 border`}>
                                            <div className='row text-center'><label htmlFor='modelName'>Model</label></div>
                                            <div className='row'><Field className={`${styles.inputs} text-center`} name="modelName" id="modelName" /></div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                    </div>
                                    <div className='row'>
                                        <div className={`col-4 border `}>
                                            <div className='row text-center'><label htmlFor='fuelType.fuel'>Yakıt</label></div>
                                            <div className='row'>
                                                <Field as="select" className={`${styles.inputs}`} name="fuelTypeId" id="fuelTypeId" >
                                                    {fuels?.map((fuel: any) => (
                                                        <option key={fuel.id} value={fuel.id}>
                                                            {fuel.fuel}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                        </div>
                                        <div className={`col-4 border `}>
                                            <div className='row text-center'><label htmlFor='gearType.gear'>Şanzıman</label></div>
                                            <div className='row '>
                                                <Field as="select" className={`${styles.inputs} `} name="gearTypeId" id="gearTypeId" >
                                                    {gears?.map((gear: any) => (
                                                        <option key={gear.id} value={gear.id}>
                                                            {gear.gear}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                        </div>
                                        <div className={`col-4  border`}>
                                            <div className='row text-center'><label htmlFor='carType.car'>Tip</label></div>
                                            <div className='row '>
                                                <Field as="select" className={`${styles.inputs}`} name="carTypeId" id="carTypeId" >
                                                    {carTypes?.map((cartype: any) => (
                                                        <option key={cartype.id} value={cartype.id}>
                                                            {cartype.car}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
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
                                        <div className={`col-12 justify-content-center`}>
                                            <div className='row text-center'>
                                                <button type='submit' className={styles.btn}>Ekle</button>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default AdminModelAddComponent