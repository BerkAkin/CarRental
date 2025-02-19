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

            <Formik initialValues={Item} validationSchema={modelValidationSchema} onSubmit={onSubmitHandler} enableReinitialize>
                {({ handleSubmit }) => (
                    <>
                        <table className={`${styles.tableFont} table-hover table mt-2`}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Marka</th>
                                    <th>Model</th>
                                    <th>Yakıt</th>
                                    <th>Şanzıman</th>
                                    <th>Tip</th>
                                    <th className='text-center'>Kişi</th>
                                    <th className='text-center'>Bagaj</th>
                                    <th className='text-center'>Kapı</th>
                                    <th className='text-center'>Ücret</th>
                                    <th>Açıklama</th>
                                    <th>Diğer Hizmetler</th>
                                    <th>Diğer Özellikler</th>
                                    <th>İşlemler</th>
                                </tr>


                            </thead>
                            <tbody>
                                <tr>
                                    <td className='col-1 border'><Image URL={dummyImage} Width='115px' /></td>
                                    <td className='col border'>
                                        <label htmlFor='brandName'><span className={styles.error}><ErrorMessage name="brandName" component="span" className={`${styles.error}`} /></span></label>
                                        <Field className={`${styles.inputs}`} name="brandName" id="brandName" />
                                    </td>
                                    <td className='col border'>
                                        <label htmlFor='modelName'><span className={styles.error}><ErrorMessage name="modelName" component="span" className={`${styles.error}`} /> </span></label>
                                        <Field className={`${styles.inputs}`} name="modelName" id="modelName" />
                                    </td>
                                    <td className='col-1 border'>
                                        <label htmlFor='fuelType.fuel'><span className={styles.error}><ErrorMessage name="fuelTypeId" component="span" className={`${styles.error}`} /></span></label>
                                        <Field as="select" className={`${styles.inputs}`} name="fuelType.id" id="fuelType.id" >
                                            {Fuels.map((fuel) => (
                                                <option key={fuel.id} value={fuel.id}>
                                                    {fuel.fuel}
                                                </option>
                                            ))}
                                        </Field></td>
                                    <td className='col-1 border'>
                                        <label htmlFor='gearType.gear'><span className={styles.error}><ErrorMessage name="gearTypeId" component="span" className={`${styles.error}`} /></span></label>
                                        <Field as="select" className={`${styles.inputs} `} name="gearType.id" id="gearType.id" >
                                            {Gears.map((gear) => (
                                                <option key={gear.id} value={gear.id}>
                                                    {gear.gear}
                                                </option>
                                            ))}
                                        </Field>
                                    </td>
                                    <td className='col-1 border'>
                                        <label htmlFor='carType.car'><span className={styles.error}><ErrorMessage name="carTypeId" component="span" className={`${styles.error}`} /></span></label>
                                        <Field as="select" className={`${styles.inputs}`} name="carType.id" id="carType.id" >
                                            {CarTypes.map((cartype) => (
                                                <option key={cartype.id} value={cartype.id}>
                                                    {cartype.car}
                                                </option>
                                            ))}
                                        </Field>
                                    </td>

                                    <td className='col border'>
                                        <label htmlFor='personCount'><span className={styles.error}><ErrorMessage name="personCount" component="span" className={`${styles.error}`} /></span></label>
                                        <Field className={`${styles.inputs} text-center`} name="personCount" id="personCount" />
                                    </td>
                                    <td className='col border'>
                                        <label htmlFor='luggageCount'><span className={styles.error}><ErrorMessage name="luggageCount" component="span" className={`${styles.error}`} /></span></label>
                                        <Field className={`${styles.inputs} text-center`} name="luggageCount" id="luggageCount" />
                                    </td>
                                    <td className='col border'>
                                        <label htmlFor='doorCount'><span className={styles.error}><ErrorMessage name="doorCount" component="span" className={`${styles.error}`} /></span></label>
                                        <Field className={`${styles.inputs} text-center`} name="doorCount" id="doorCount" />
                                    </td>
                                    <td className='col border'>
                                        <label htmlFor='price'><span className={styles.error}><ErrorMessage name="price" component="span" className={`${styles.error}`} /></span></label>
                                        <Field className={`${styles.inputs} text-center`} name="price" id="price" />
                                    </td>
                                    <td className='col- border'>
                                        <label htmlFor='description'><span className={styles.error}><ErrorMessage name="description" component="span" className={`${styles.error}`} /></span></label>
                                        <Field as="textarea" className={`${styles.inputsTA}`} name="description" id="description" />
                                    </td>
                                    <td className='col-1 border'>

                                        <label htmlFor='otherServices'><span className={styles.error}><ErrorMessage name="otherServices" component="span" className={`${styles.error}`} /></span></label>
                                        <Field as="textarea" className={`${styles.inputsTA}`} name="otherServices" id="otherServices" />
                                    </td>
                                    <td className='col-1 border'>

                                        <label htmlFor='otherFeatures'><span className={styles.error}><ErrorMessage name="otherFeatures" component="span" className={`${styles.error}`} /></span></label>
                                        <Field as="textarea" className={`${styles.inputsTA}`} name="otherFeatures" id="otherFeatures" />
                                    </td>
                                    <td className='col-1 border'>
                                        <button type='button' onClick={() => handleSubmit()} className={styles.btn}>Güncelle</button>
                                        <button onClick={() => onDeleteHandler(Item.id)} className={styles.deleteBtn}>Sil</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>




                    </>

                )}
            </Formik>

        </>




    )
}

export default AdminModelEditCardComponent