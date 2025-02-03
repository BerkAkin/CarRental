import React from 'react'
import styles from './styles.module.css'
import Image from '../../Image/Image'
import dummyImage from '../../../assets/images/LandingImages/Mach-e.1920x1080-1920x1080.jpg'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import apiService from '../../../api/apiService'
import { endpoints } from '../../../api/apiConfig'
import { useToastManagerContext } from '../../../Contexts/ToastManagerContext'
import { StatusHandler } from '../../../common/StatusHandler'
import { useConfirmContext } from '../../../Contexts/ConfirmationContext'
import modelValidationSchema from '../AdminModelAddComponent/ModelValidationSchema'


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



function AdminModelEditCardComponent({ Item, Gears, Fuels, CarTypes }: ItemProp) {
    const { showToast } = useToastManagerContext();
    const { showConfirmation } = useConfirmContext();


    const onSubmitHandler = async (values: any) => {
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
        showConfirmation("Model güncellenecektir. Devam edilsin mi?", async () => {
            try {
                const { data, status }: any = await apiService(endpoints.models + `${values.id}`, "PUT", dataToSend)
                StatusHandler(status, data, showToast)
            } catch (error) {
                const { status, message }: any = error;
                StatusHandler(status, message, showToast)
            }
        }
        )

    }

    const onDeleteHandler = async (id: number) => {
        showConfirmation("Seçilen model silinecektir. Devam edilsin mi?", async () => {
            try {
                const { data, status }: any = await apiService(endpoints.models + id, "DELETE");
                StatusHandler(status, data, showToast)
            } catch (error) {
                const { status, message }: any = error;
                StatusHandler(status, message, showToast)
            }
        })

    }
    return (
        <>

            <div className='container'>
                <Formik initialValues={Item} validationSchema={modelValidationSchema} onSubmit={onSubmitHandler} enableReinitialize>
                    <Form>


                        <div className='row border'>
                            <Image URL={dummyImage} Width='200px' />
                        </div>

                        <div className='row'>
                            <div className='container-fluid'>
                                <div className='row'>

                                    <div className={`col-6 border`}>
                                        <div className='row text-center'><label htmlFor='brandName'>Marka <span className={styles.error}> * <ErrorMessage name="brandName" component="span" className={`${styles.error}`} /></span></label></div>
                                        <div className='row'>  <Field className={`${styles.inputs} text-center`} name="brandName" id="brandName" /></div>
                                    </div>
                                    <div className={`col-6 border`}>
                                        <div className='row text-center'><label htmlFor='modelName'>Model <span className={styles.error}> * <ErrorMessage name="modelName" component="span" className={`${styles.error}`} /> </span></label></div>
                                        <div className='row'><Field className={`${styles.inputs} text-center`} name="modelName" id="modelName" /></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className={`col-4 border `}>
                                        <div className='row text-center'><label htmlFor='fuelType.fuel'>Yakıt <span className={styles.error}> * <ErrorMessage name="fuelTypeId" component="span" className={`${styles.error}`} /></span></label></div>
                                        <div className='row'>
                                            <Field as="select" className={`${styles.inputs}`} name="fuelType.id" id="fuelType.id" >
                                                {Fuels.map((fuel) => (
                                                    <option key={fuel.id} value={fuel.id}>
                                                        {fuel.fuel}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
                                    </div>
                                    <div className={`col-4 border `}>
                                        <div className='row text-center'><label htmlFor='gearType.gear'>Şanzıman <span className={styles.error}> * <ErrorMessage name="gearTypeId" component="span" className={`${styles.error}`} /></span></label></div>
                                        <div className='row '>
                                            <Field as="select" className={`${styles.inputs} `} name="gearType.id" id="gearType.id" >
                                                {Gears.map((gear) => (
                                                    <option key={gear.id} value={gear.id}>
                                                        {gear.gear}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
                                    </div>
                                    <div className={`col-4  border`}>
                                        <div className='row text-center'><label htmlFor='carType.car'>Tip <span className={styles.error}> * <ErrorMessage name="carTypeId" component="span" className={`${styles.error}`} /></span></label></div>
                                        <div className='row '>
                                            <Field as="select" className={`${styles.inputs}`} name="carType.id" id="carType.id" >
                                                {CarTypes.map((cartype) => (
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
                                        <div className='row text-center'><label htmlFor='description'>Açıklama <span className={styles.error}> * <ErrorMessage name="description" component="span" className={`${styles.error}`} /></span></label></div>
                                        <div className='row'><Field className={`${styles.inputs} text-center`} name="description" id="description" /></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className={`border col-4 justify-content-center`}>
                                        <div className='row text-center'><label htmlFor='personCount'>Kişi <span className={styles.error}> * <ErrorMessage name="personCount" component="span" className={`${styles.error}`} /></span></label></div>
                                        <div className='row'><Field className={`${styles.inputs} text-center`} name="personCount" id="personCount" /></div>
                                    </div>
                                    <div className={`border col-4 justify-content-center`}>
                                        <div className='row text-center'><label htmlFor='luggageCount'>Bagaj <span className={styles.error}> * <ErrorMessage name="luggageCount" component="span" className={`${styles.error}`} /></span></label></div>
                                        <div className='row'><Field className={`${styles.inputs} text-center`} name="luggageCount" id="luggageCount" /></div>
                                    </div>
                                    <div className={`border col-4 justify-content-center`}>
                                        <div className='row text-center'><label htmlFor='doorCount'>Kapı <span className={styles.error}> * <ErrorMessage name="doorCount" component="span" className={`${styles.error}`} /></span></label></div>
                                        <div className='row'><Field className={`${styles.inputs} text-center`} name="doorCount" id="doorCount" /></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className={`col-12 border justify-content-center`}>
                                        <div className='row text-center'><label htmlFor='price'>Aylık Kiralama Bedeli <span className={styles.error}> * <ErrorMessage name="price" component="span" className={`${styles.error}`} /></span></label></div>
                                        <div className='row'> <Field className={`${styles.inputs} text-center`} name="price" id="price" /></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className={`col-12 border justify-content-center`}>
                                        <div className='row text-center'><label htmlFor='otherServices'>Sunulan Diğer Hizmetler <span className={styles.error}> * <ErrorMessage name="otherServices" component="span" className={`${styles.error}`} /></span></label></div>
                                        <div className='row'>  <Field className={`${styles.inputs}`} name="otherServices" id="otherServices" /></div>
                                    </div>
                                </div>
                                <div className='row '>
                                    <div className={`col-12 border justify-content-center`}>
                                        <div className='row text-center'><label htmlFor='otherFeatures'>Diğer Araç Özellikleri <span className={styles.error}> * <ErrorMessage name="otherFeatures" component="span" className={`${styles.error}`} /></span></label></div>
                                        <div className='row'> <Field className={`${styles.inputs}`} name="otherFeatures" id="otherFeatures" /></div>
                                    </div>
                                </div>
                                <div className='row border'>
                                    <div className={`col-12 border justify-content-center`}>
                                        <div className='row text-center'>
                                            <button type='submit' className={styles.btn}>Güncelle</button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
                <div className='row mt-2'>
                    <button onClick={() => onDeleteHandler(Item.id)} className={styles.deleteBtn}>Sil</button>
                </div>
            </div>


        </>




    )
}

export default AdminModelEditCardComponent