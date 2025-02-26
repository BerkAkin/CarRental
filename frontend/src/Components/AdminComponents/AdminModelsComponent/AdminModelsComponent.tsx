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
                            <div className="table-responsive">
                                <table className={`${styles.tableFont} table-hover table mt-2`}>
                                    <thead>
                                        <tr>
                                            <th>Fotoğraf</th>
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

                                    {models?.data.map((item: any) => (
                                        <AdminModelEditCardComponent Item={item} CarTypes={carTypes} Fuels={fuels} Gears={gears} />

                                    ))}
                                </table>
                            </div>
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