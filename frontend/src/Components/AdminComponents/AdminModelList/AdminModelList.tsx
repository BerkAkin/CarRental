import { useState } from 'react'
import styles from './styles.module.css'
import apiService from '../../../api/apiService'
import { useToastManagerContext } from '../../../Contexts/ToastManagerContext'
import { StatusHandler } from '../../../common/StatusHandler'
import { useConfirmContext } from '../../../Contexts/ConfirmationContext'
import { useModelsContext } from '../../../Contexts/ModelsContext'

interface ItemProp {
    setItemAndEditStatus: () => void;
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
}

function AdminModelList({ Item, Gears, Fuels, CarTypes, setItemAndEditStatus }: ItemProp) {

    const { showToast } = useToastManagerContext();
    const { showConfirmation } = useConfirmContext();
    const { fetchModels } = useModelsContext();
    const [ImageDirectory, SetImageDirectory] = useState(Item.imageDirectory);


    const onDeleteHandler = async (slug: string) => {
        showConfirmation("Seçilen model silinecektir. Devam edilsin mi?", async () => {
            try {
                const { data, status }: any = await apiService(process.env.REACT_APP_MODELS_ENDPOINT + `/${slug}`, "DELETE");
                StatusHandler(status, data, showToast)
                fetchModels();
            } catch (error) {
                const { status, message }: any = error;
                StatusHandler(status, message, showToast)
            }
        })
    }


    return (
        <tbody className='border'>
            <tr>
                <td className='col-2 border text-center'>
                    {Item.brandName}
                </td>
                <td className='col-2 border text-center'>
                    {Item.modelName}
                </td>
                <td className='col-2 border text-center'>
                    {Item.carType.car}
                </td>
                <td className='col-2 border text-center'>
                    {Item.fuelType.fuel}
                </td>
                <td className='col-2 border text-center'>
                    {Item.gearType.gear}
                </td>

                <td className='col-1 border text-center p-1'>
                    <button onClick={setItemAndEditStatus} type='button' className={styles.btn} >✎</button>
                    <button onClick={() => onDeleteHandler(Item.slug)} className={`${styles.deleteBtn} mx-2 m-0`}>✖</button>
                </td>

            </tr>
        </tbody>
    )
}

export default AdminModelList