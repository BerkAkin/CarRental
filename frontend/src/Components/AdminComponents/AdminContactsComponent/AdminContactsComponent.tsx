import styles from "./styles.module.css"
import { useContactContext } from '../../../Contexts/ContactContext';

function AdminContactsComponent() {

    const { contacts, handleNextPage, handlePreviousPage, error } = useContactContext();



    if (error) return <p>{error}</p>
    return (
        <div className={`${styles.innerBG} my-2 border table-responsive`}>
            <table className={`${styles.tableFontSize} table-striped table-hover table mt-2 `}>
                <thead>
                    <tr>
                        <th scope="col" className=" col-2">Ad Soyad</th>
                        <th scope="col" className=" col-2">E-Posta</th>
                        <th scope="col" className=" col-2">Telefon Numarası</th>
                        <th scope="col" className=" col-1">Veri İzni</th>
                        <th scope="col" className=" col-1">Duyulan Platform</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts ?

                        (contacts?.data.map((item: any, index: number) => (

                            <tr key={item.id}>
                                <td className={`${styles.tableInfos} border`}>{item.name} {item.surname}</td>
                                <td className={`${styles.tableInfos} border`}>{item.email}</td>
                                <td className={`${styles.tableInfos} border`}>{item.phone}</td>
                                <td className={`${styles.tableInfos} border`}>{item.permission}</td>
                                <td className={`${styles.tableInfos} border`}>{item.platform}</td>
                            </tr >

                        ))

                        )
                        :
                        (<></>)}
                </tbody>
            </table>
            <div className='d-flex justify-content-end my-4'>
                <button onClick={handlePreviousPage} className={`${styles.btn}`} style={{ width: "150px" }}>Önceki Sayfa</button>
                <button onClick={handleNextPage} className={`${styles.btn} ms-3`} style={{ width: "150px" }}>Sonraki Sayfa</button>
            </div>
        </div>
    )
}

export default AdminContactsComponent