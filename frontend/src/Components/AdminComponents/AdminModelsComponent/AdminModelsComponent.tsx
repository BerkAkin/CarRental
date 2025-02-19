import styles from "./styles.module.css"
import { useTypesContext } from '../../../Contexts/TypesContext'
import { useModelsContext } from '../../../Contexts/ModelsContext';
import AdminModelEditCardComponent from "../AdminModelEditCardComponent/AdminModelEditCardComponent";




function AdminModelsComponent() {

    const { gears, fuels, carTypes } = useTypesContext();
    const { HandleNextModelPage, HandlePreviousModelPage, models, error } = useModelsContext();

    if (error) return <p>{error}</p>

    return (
        <>
            <div className='d-flex justify-content-end mt-4 mb-1'>
                <button onClick={HandlePreviousModelPage} className={`${styles.btn}`} style={{ width: "150px" }}>Önceki Sayfa</button>
                <button onClick={HandleNextModelPage} className={`${styles.btn} ms-3`} style={{ width: "150px" }}>Sonraki Sayfa</button>
            </div>
            <div className='row'>
                {
                    models && gears && carTypes && fuels ?
                        (
                            <>
                                {models?.data.map((item: any) => (
                                    <div key={item.id}>
                                        <AdminModelEditCardComponent Item={item} CarTypes={carTypes} Fuels={fuels} Gears={gears} />
                                    </div>

                                ))}
                            </>
                        )
                        :
                        (
                            <>Modeller Yüklenemedi</>
                        )
                }
            </div>

        </>
    )
}

export default AdminModelsComponent