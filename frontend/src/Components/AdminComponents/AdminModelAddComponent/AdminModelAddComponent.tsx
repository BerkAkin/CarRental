import React, { useContext, useState } from 'react'
import styles from "./styles.module.css"
import { useTypesContext } from '../../../Contexts/TypesContext'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Image from '../../Image/Image'
import apiService from '../../../api/apiService'
import { endpoints } from '../../../api/apiConfig'
import { useToastManagerContext } from '../../../Contexts/ToastManagerContext'
import { StatusHandler } from '../../../common/StatusHandler'
import { useConfirmContext } from '../../../Contexts/ConfirmationContext'
import modelValidationSchema from './ModelValidationSchema'



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



function AdminModelAddComponent({ cancelFunc }: any) {
    const { showToast } = useToastManagerContext();
    const { showConfirmation } = useConfirmContext();
    const { gears, fuels, carTypes } = useTypesContext();
    const [ImageDirectory, SetImageDirectory] = useState();

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);

        try {
            const { data } = await apiService(endpoints.uploadModelImage, "POST", formData, "", true);
            SetImageDirectory(data.image);

            showToast("Görsel başarıyla yüklendi!", "success");
        } catch (error) {
            showToast("Görsel yüklenirken hata oluştu!", "error");
        }
    }

    const addNewCarSubmitHandler = async (values: AddNewCarProps) => {

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
            otherServices: values.otherServices,
            otherFeatures: values.otherFeatures,
            imageDirectory: ImageDirectory,
        };

        showConfirmation("Oluşturulan model eklenecektir. Devam edilsin mi?", async () => {
            try {
                const { data, status }: any = await apiService(endpoints.models, "POST", dataToSend);
                StatusHandler(status, data, showToast)
            } catch (error) {
                const { status, message }: any = error;
                StatusHandler(status, message, showToast)
            }
        });

    }

    const initialValuesOfAddCar: AddNewCarProps = {
        fuelTypeId: 1,
        gearTypeId: 1,
        carTypeId: 1,
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


    return (

        <Formik validationSchema={modelValidationSchema} initialValues={initialValuesOfAddCar} onSubmit={addNewCarSubmitHandler}>
            <Form>

                <div className={`${styles.bgColor} container-fluid border `}>
                    <div className='row'>
                        <div className='col-3 border-bottom border-end'></div>
                        <div className='col-9 border-bottom pt-3'>
                            <Field type="file" accept="image/*" name="imageDirectory">
                                {({ form }: any) => (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => handleImageUpload(event)}
                                        className={`${styles.inputs}`}
                                    />
                                )}
                            </Field>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 border-bottom border-end align-items-center d-flex'>
                            <label htmlFor='brandName'>Marka: <span className={styles.error}><ErrorMessage name="brandName" component="span" className={`${styles.error}`} /></span></label>
                        </div>
                        <div className='col-9 border-bottom'>
                            <Field className={`${styles.inputs}`} name="brandName" id="brandName" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 border-bottom border-end align-items-center d-flex'>
                            <label htmlFor='modelName'>Model: <span className={styles.error}><ErrorMessage name="modelName" component="span" className={`${styles.error}`} /></span> </label>
                        </div>
                        <div className='col-9 border-bottom'>
                            <Field className={`${styles.inputs}`} name="modelName" id="modelName" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 border-bottom border-end align-items-center d-flex'>
                            <label htmlFor='fuelType.fuel'>Yakıt: <span className={styles.error}><ErrorMessage name="fuelTypeId" component="span" className={`${styles.error}`} /></span> </label>
                        </div>
                        <div className='col-9 border-bottom'>
                            <Field as="select" className={`${styles.inputs}`} name="fuelTypeId" id="fuelTypeId" >
                                {fuels?.map((fuel: any) => (
                                    <option key={fuel.id} value={fuel.id}>
                                        {fuel.fuel}
                                    </option>
                                ))}
                            </Field>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 border-bottom border-end align-items-center d-flex'>
                            <label htmlFor='gearType.gear'>Şanzıman: <span className={styles.error}><ErrorMessage name="gearTypeId" component="span" className={`${styles.error}`} /></span> </label>
                        </div>
                        <div className='col-9 border-bottom'>
                            <Field as="select" className={`${styles.inputs} `} name="gearTypeId" id="gearTypeId" >
                                {gears?.map((gear: any) => (
                                    <option key={gear.id} value={gear.id}>
                                        {gear.gear}
                                    </option>
                                ))}
                            </Field>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 border-bottom border-end align-items-center d-flex'>
                            <label htmlFor='carType.car'>Tip: <span className={styles.error}><ErrorMessage name="carTypeId" component="span" className={`${styles.error}`} /></span> </label>
                        </div>
                        <div className='col-9 border-bottom'>
                            <Field as="select" className={`${styles.inputs}`} name="carTypeId" id="carTypeId" >
                                {carTypes?.map((cartype: any) => (
                                    <option key={cartype.id} value={cartype.id}>
                                        {cartype.car}
                                    </option>
                                ))}
                            </Field>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 border-bottom border-end align-items-center d-flex'>
                            <label htmlFor='description'>Açıklama: <span className={styles.error}><ErrorMessage name="description" component="span" className={`${styles.error}`} /></span> </label>
                        </div>
                        <div className='col-9 border-bottom'>
                            <Field className={`${styles.inputs}`} name="description" id="description" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 border-bottom border-end align-items-center d-flex'>
                            <label htmlFor='personCount'>Kişi: <span className={styles.error}><ErrorMessage name="personCount" component="span" className={`${styles.error}`} /></span> </label>
                        </div>
                        <div className='col-9 border-bottom'>
                            <Field className={`${styles.inputs}`} name="personCount" id="personCount" />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-3 border-bottom border-end align-items-center d-flex'>
                            <label htmlFor='luggageCount'>Bagaj: <span className={styles.error}><ErrorMessage name="luggageCount" component="span" className={`${styles.error}`} /></span> </label>
                        </div>
                        <div className='col-9 border-bottom'>
                            <Field className={`${styles.inputs}`} name="luggageCount" id="luggageCount" />
                        </div>
                    </div><div className='row'>
                        <div className='col-3 border-bottom border-end align-items-center d-flex'>
                            <label htmlFor='doorCount'>Kapı Sayısı: <span className={styles.error}><ErrorMessage name="doorCount" component="span" className={`${styles.error}`} /></span> </label>
                        </div>
                        <div className='col-9 border-bottom'>
                            <Field className={`${styles.inputs}`} name="doorCount" id="doorCount" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 border-bottom border-end align-items-center d-flex'>
                            <label htmlFor='price'>Ücret: <span className={styles.error}><ErrorMessage name="price" component="span" className={`${styles.error}`} /></span> </label>
                        </div>
                        <div className='col-9 border-bottom'>
                            <Field className={`${styles.inputs}`} name="price" id="price" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 border-bottom border-end align-items-center d-flex'>
                            <label htmlFor='otherServices'>Servisler: <span className={styles.error}><ErrorMessage name="otherServices" component="span" className={`${styles.error}`} /></span> </label>
                        </div>
                        <div className='col-9 border-bottom'>
                            <Field className={`${styles.inputs}`} name="otherServices" id="otherServices" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 border-bottom border-end align-items-center d-flex'>
                            <label htmlFor='otherFeatures'>Özellikler: <span className={styles.error}><ErrorMessage name="otherFeatures" component="span" className={`${styles.error}`} /></span> </label>
                        </div>
                        <div className='col-9 border-bottom'>
                            <Field className={`${styles.inputs}`} name="otherFeatures" id="otherFeatures" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 border-bottom border-end align-items-center d-flex'></div>
                        <div className='col-9 border-bottom'></div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-6'>
                            <button onClick={cancelFunc} className={`${styles.cancelBtn}`}>✖</button>
                        </div>
                        <div className='col-6'>
                            <button type='submit' className={styles.btn}>✔</button>
                        </div>
                    </div>

                </div>
            </Form>
        </Formik>

    )
}

export default AdminModelAddComponent