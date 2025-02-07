import styles from "./styles.module.css"
import { useContactContext } from '../../Contexts/ContactContext';

function Contacts() {

    const { contacts, handleNextPage, handlePreviousPage, error } = useContactContext();



    if (error) return <p>{error}</p>
    return (
        <div>
            <table className={`${styles.tableFontSize} table-striped table-hover table mt-2 `}>
                <thead>
                    <tr>
                        <th scope="col" className="text-center">Ad Soyad</th>
                        <th scope="col" className="text-center">E-Posta</th>
                        <th scope="col" className="text-center">Telefon Numarası</th>
                        <th scope="col" className="text-center">Veri İzni</th>
                        <th scope="col" className="text-center">Duyulan Platform</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts ?

                        (contacts?.data.map((item: any, index: number) => (

                            <tr key={item.id}>
                                <td className='text-center'>{item.name} {item.surname}</td>
                                <td className='text-center'>{item.email}</td>
                                <td className='text-center'>{item.phone}</td>
                                <td className='text-center'>{item.permission}</td>
                                <td className='text-center'>{item.platform}</td>
                            </tr >

                        ))

                        )
                        :
                        (<></>)}
                </tbody>
            </table>
            <div className='d-flex justify-content-end mt-4'>
                <button onClick={handlePreviousPage} className={`${styles.btn}`} style={{ width: "150px" }}>Önceki Sayfa</button>
                <button onClick={handleNextPage} className={`${styles.btn} ms-3`} style={{ width: "150px" }}>Sonraki Sayfa</button>
            </div>
        </div>
    )
}

export default Contacts