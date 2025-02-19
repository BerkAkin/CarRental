import styles from "./styles.module.css"
import { useTypesContext } from '../../../Contexts/TypesContext'
import { useModelsContext } from '../../../Contexts/ModelsContext';
import AdminModelEditCardComponent from "../AdminModelEditCardComponent/AdminModelEditCardComponent";




function AdminModelsComponent({ addNewFunc }: any) {

    const { gears, fuels, carTypes } = useTypesContext();
    const { HandleNextModelPage, HandlePreviousModelPage, models, error } = useModelsContext();

    if (error) return <p>{error}</p>

    return (
        <div className={`${styles.innerBG} border container my-2`}>
            <div className='d-flex justify-content-end my-4'>
                <button onClick={addNewFunc} className={`${styles.addBtn}`} style={{ width: "150px" }}>Yeni Model Ekle</button>
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
            <div className='d-flex justify-content-end my-4'>
                <button onClick={HandlePreviousModelPage} className={`${styles.btn} mx-3`} style={{ width: "150px" }}>Önceki Sayfa</button>
                <button onClick={HandleNextModelPage} className={`${styles.btn}`} style={{ width: "150px" }}>Sonraki Sayfa</button>
            </div>

        </div>
    )
}

export default AdminModelsComponent