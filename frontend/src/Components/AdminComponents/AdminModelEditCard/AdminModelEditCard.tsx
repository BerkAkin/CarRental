import React, { useState } from 'react'
import styles from './styles.module.css'
import Image from '../../Image/Image'
import { Formik, Field, ErrorMessage } from 'formik'
import apiService from '../../../api/apiService'
import { useToastManagerContext } from '../../../Contexts/ToastManagerContext'
import { StatusHandler } from '../../../common/StatusHandler'
import { useConfirmContext } from '../../../Contexts/ConfirmationContext'
import { useModelsContext } from '../../../Contexts/ModelsContext'
import modelEditValidationSchema from './ModelEditValidationSchema'


interface ItemProp {
    Item: {
        id: number,
        slug: string,
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
        otherServices: string,
        otherFeatures: string,
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

    CancelBtn: () => void
}





function AdminModelEditCard({ Item, Gears, Fuels, CarTypes, CancelBtn }: ItemProp) {

    const { showToast } = useToastManagerContext();
    const { showConfirmation } = useConfirmContext();
    const { fetchModels } = useModelsContext();
    const [ImageDirectory, SetImageDirectory] = useState(Item.imageDirectory);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);

        try {
            const { data } = await apiService(process.env.REACT_APP_UPLOAD_MODEL_IMAGE_ENDPOINT, "POST", formData, "", true);
            SetImageDirectory(data.image);

            showToast("Görsel başarıyla yüklendi!", "success");
        } catch (error) {
            showToast("Görsel yüklenirken hata oluştu!", "error");
        }
    }


    const onSubmitHandler = async (values: any) => {

        const dataToSend = {
            fuelTypeId: Number(values.fuelType.id),
            gearTypeId: Number(values.gearType.id),
            carTypeId: Number(values.carType.id),
            slug: values.slug,
            brandName: values.brandName,
            modelName: values.modelName,
            description: values.description,
            personCount: values.personCount,
            luggageCount: values.luggageCount,
            doorCount: values.doorCount,
            price: values.price,
            otherServices: values.otherServices,
            otherFeatures: values.otherFeatures,
            imageDirectory: ImageDirectory
        };

        showConfirmation("Model güncellenecektir. Devam edilsin mi?", async () => {
            try {
                const { data, status }: any = await apiService(process.env.REACT_APP_MODELS_ENDPOINT, "PUT", dataToSend)
                StatusHandler(status, data, showToast);
                fetchModels();
                CancelBtn();
            } catch (error) {
                const { status, message }: any = error;
                StatusHandler(status, message, showToast)
            }
        }
        )

    }


    return (
        <>

            <Formik initialValues={Item} onSubmit={onSubmitHandler} validationSchema={modelEditValidationSchema} enableReinitialize>

                {({ handleSubmit }) => (
                    <>

                        <div className='col-12'>
                            <div className='row border-bottom border-top'>
                                <div className='col-3  border-end'>
                                    <div className={`${styles.imgDivision}`}>
                                        <Image URL={Item.imageDirectory} />
                                    </div>
                                </div>
                                <div className='col-9 d-flex align-items-center'>
                                    <Field type="file" accept="image/*" name="imageDirectory">
                                        {({ form }: any) => (
                                            <input className={`w-100`}
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) => handleImageUpload(event)}
                                            />
                                        )}
                                    </Field>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 border-bottom border-end align-items-center d-flex'>
                                    <label htmlFor='brandName'>Marka: <span className={styles.error}><ErrorMessage name="brandName" component="span" className={`${styles.error}`} /></span></label>
                                </div>
                                <div className='col-9 border-bottom '>
                                    <Field className={`${styles.inputs}`} name="brandName" id="brandName" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 border-bottom border-end align-items-center d-flex '>
                                    <label htmlFor='modelName'>Model: <span className={styles.error}><ErrorMessage name="modelName" component="span" className={`${styles.error}`} /> </span></label>
                                </div>
                                <div className='col-9 border-bottom'>
                                    <Field className={`${styles.inputs}`} name="modelName" id="modelName" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 border-bottom border-end align-items-center d-flex'>
                                    <label htmlFor='fuelType.fuel'>Yakıt: <span className={styles.error}><ErrorMessage name="fuelTypeId" component="span" className={`${styles.error}`} /></span></label>
                                </div>
                                <div className='col-9 border-bottom'>
                                    <Field as="select" className={`${styles.inputs}`} name="fuelType.id" id="fuelType.id" >
                                        {Fuels.map((fuel) => (
                                            <option key={fuel.id} value={fuel.id}>
                                                {fuel.fuel}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 border-bottom border-end align-items-center d-flex'>
                                    <label htmlFor='gearType.gear'>Şanzıman: <span className={styles.error}><ErrorMessage name="gearTypeId" component="span" className={`${styles.error}`} /></span></label>

                                </div>
                                <div className='col-9 border-bottom'>
                                    <Field as="select" className={`${styles.inputs} `} name="gearType.id" id="gearType.id" >
                                        {Gears.map((gear) => (
                                            <option key={gear.id} value={gear.id}>
                                                {gear.gear}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 border-bottom border-end align-items-center d-flex'>
                                    <label htmlFor='carType.car'>Tip: <span className={styles.error}><ErrorMessage name="carTypeId" component="span" className={`${styles.error}`} /></span></label>
                                </div>
                                <div className='col-9 border-bottom'> <Field as="select" className={`${styles.inputs}`} name="carType.id" id="carType.id" >
                                    {CarTypes.map((cartype) => (
                                        <option key={cartype.id} value={cartype.id}>
                                            {cartype.car}
                                        </option>
                                    ))}
                                </Field>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 border-bottom border-end align-items-center d-flex'>
                                    <label htmlFor='personCount'>Kişi: <span className={styles.error}><ErrorMessage name="personCount" component="span" className={`${styles.error}`} /></span></label>
                                </div>
                                <div className='col-9 border-bottom'><Field className={`${styles.inputs} `} name="personCount" id="personCount" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 border-bottom border-end align-items-center d-flex'>
                                    <label htmlFor='luggageCount'>Bagaj: <span className={styles.error}><ErrorMessage name="luggageCount" component="span" className={`${styles.error}`} /></span></label>
                                </div>
                                <div className='col-9 border-bottom'>
                                    <Field className={`${styles.inputs}`} name="luggageCount" id="luggageCount" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 border-bottom border-end align-items-center d-flex'>
                                    <label htmlFor='doorCount'>Kapı: <span className={styles.error}><ErrorMessage name="doorCount" component="span" className={`${styles.error}`} /></span></label>
                                </div>
                                <div className='col-9 border-bottom'>
                                    <Field className={`${styles.inputs}`} name="doorCount" id="doorCount" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 border-bottom border-end align-items-center d-flex'>
                                    <label htmlFor='price'>Fiyat: <span className={styles.error}><ErrorMessage name="price" component="span" className={`${styles.error}`} /></span></label>
                                </div>
                                <div className='col-9 border-bottom'>
                                    <Field className={`${styles.inputs}`} name="price" id="price" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 border-bottom border-end align-items-center d-flex'>
                                    <label htmlFor='description'>Açıklama: <span className={styles.error}><ErrorMessage name="description" component="span" className={`${styles.error}`} /></span></label>
                                </div>
                                <div className='col-9 border-bottom'>
                                    <Field as="textarea" className={`${styles.inputsTA}`} name="description" id="description" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 border-bottom border-end align-items-center d-flex'>
                                    <label htmlFor='otherServices'>Servisler: <span className={styles.error}><ErrorMessage name="otherServices" component="span" className={`${styles.error}`} /></span></label>
                                </div>
                                <div className='col-9 border-bottom'>
                                    <Field as="textarea" className={`${styles.inputsTA}`} name="otherServices" id="otherServices" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 border-bottom border-end align-items-center d-flex'>
                                    <label htmlFor='otherFeatures'>Hizmetler:<span className={styles.error}><ErrorMessage name="otherFeatures" component="span" className={`${styles.error}`} /></span></label>
                                </div>
                                <div className='col-9 border-bottom'>
                                    <Field as="textarea" className={`${styles.inputsTA}`} name="otherFeatures" id="otherFeatures" />
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className='col-6  '>
                                    <button onClick={CancelBtn} className={styles.deleteBtn}>✖</button>
                                </div>
                                <div className='col-6  '>
                                    <button type='button' onClick={() => handleSubmit()} className={styles.btn}>↻</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Formik>

        </>




    )
}

export default AdminModelEditCard