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
        <div>
            <Formik validationSchema={modelValidationSchema} initialValues={initialValuesOfAddCar} onSubmit={addNewCarSubmitHandler}>

                <Form>

                    <div className='container-fluid border my-4 p-0'>
                        <div className='row m-0 p-0'>
                            <div className='col-4 '>
                                <Image URL={""} Width='500px'></Image>
                                <Field type="file" accept="image/*" name="imageDirectory">
                                    {({ form }: any) => (
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => handleImageUpload(event)}
                                            className={`${styles.inputs} text-center`}
                                        />
                                    )}
                                </Field>
                            </div>
                            <div className='col-8  p-0'>
                                <div className='container-fluid h-100'>
                                    <div className='row'>

                                        <div className={`col-6 `}>
                                            <div className='row text-center'><label htmlFor='brandName'>Marka <span className={styles.error}> * <ErrorMessage name="brandName" component="span" className={`${styles.error}`} /></span></label></div>
                                            <div className='row'><Field className={`${styles.inputs} text-center`} name="brandName" id="brandName" /></div>
                                        </div>
                                        <div className={`col-6 `}>
                                            <div className='row text-center'><label htmlFor='modelName'>Model <span className={styles.error}> * <ErrorMessage name="modelName" component="span" className={`${styles.error}`} /></span> </label></div>
                                            <div className='row'><Field className={`${styles.inputs} text-center`} name="modelName" id="modelName" /></div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                    </div>
                                    <div className='row'>
                                        <div className={`col-4  `}>
                                            <div className='row text-center'><label htmlFor='fuelType.fuel'>Yakıt <span className={styles.error}> * <ErrorMessage name="fuelTypeId" component="span" className={`${styles.error}`} /></span> </label></div>
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
                                            <div className='row text-center'><label htmlFor='gearType.gear'>Şanzıman <span className={styles.error}> * <ErrorMessage name="gearTypeId" component="span" className={`${styles.error}`} /></span> </label></div>
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
                                            <div className='row text-center'><label htmlFor='carType.car'>Tip <span className={styles.error}> * <ErrorMessage name="carTypeId" component="span" className={`${styles.error}`} /></span> </label></div>
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
                                            <div className='row text-center'><label htmlFor='description'>Açıklama <span className={styles.error}> * <ErrorMessage name="description" component="span" className={`${styles.error}`} /></span> </label></div>
                                            <div className='row'><Field className={`${styles.inputs} text-center`} name="description" id="description" /></div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className={`border col-4 justify-content-center`}>
                                            <div className='row text-center'><label htmlFor='personCount'>Kişi Sayısı <span className={styles.error}> * <ErrorMessage name="personCount" component="span" className={`${styles.error}`} /></span> </label></div>
                                            <div className='row'><Field className={`${styles.inputs} text-center`} name="personCount" id="personCount" /></div>
                                        </div>
                                        <div className={`border col-4 justify-content-center`}>
                                            <div className='row text-center'><label htmlFor='luggageCount'>Bagaj Sayısı <span className={styles.error}> * <ErrorMessage name="luggageCount" component="span" className={`${styles.error}`} /></span> </label></div>
                                            <div className='row'><Field className={`${styles.inputs} text-center`} name="luggageCount" id="luggageCount" /></div>
                                        </div>
                                        <div className={`border col-4 justify-content-center`}>
                                            <div className='row text-center'><label htmlFor='doorCount'>Kapı Sayısı <span className={styles.error}> * <ErrorMessage name="doorCount" component="span" className={`${styles.error}`} /></span> </label></div>
                                            <div className='row'><Field className={`${styles.inputs} text-center`} name="doorCount" id="doorCount" /></div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className={`col-12 border justify-content-center`}>
                                            <div className='row text-center'><label htmlFor='price'>Aylık Kiralama Bedeli <span className={styles.error}> * <ErrorMessage name="price" component="span" className={`${styles.error}`} /></span> </label></div>
                                            <div className='row'> <Field className={`${styles.inputs} text-center`} name="price" id="price" /></div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className={`col-12 border justify-content-center`}>
                                            <div className='row text-center'><label htmlFor='otherServices'>Sunulan Diğer Hizmetler <span className={styles.error}> * <ErrorMessage name="otherServices" component="span" className={`${styles.error}`} /></span> </label></div>
                                            <div className='row'>  <Field className={`${styles.inputs}`} name="otherServices" id="otherServices" /></div>
                                        </div>
                                    </div>
                                    <div className='row '>
                                        <div className={`col-12 border justify-content-center`}>
                                            <div className='row text-center'><label htmlFor='otherFeatures'>Diğer Araç Özellikleri <span className={styles.error}> * <ErrorMessage name="otherFeatures" component="span" className={`${styles.error}`} /></span> </label></div>
                                            <div className='row'> <Field className={`${styles.inputs}`} name="otherFeatures" id="otherFeatures" /></div>
                                        </div>
                                    </div>
                                    <div className='row border'>
                                        <div className={`col-12 justify-content-center`}>
                                            <div className='row text-center'>
                                                <div className='col p-0'><button type='submit' className={styles.btn}>Ekle</button></div>
                                                <div className='col p-0'><button onClick={cancelFunc} className={`${styles.addBtnCancel}`}>İptal Et</button></div>


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default AdminModelAddComponent