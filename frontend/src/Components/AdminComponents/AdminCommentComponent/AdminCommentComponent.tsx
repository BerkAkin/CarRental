import styles from "./styles.module.css"
import { useCommentsContext } from '../../../Contexts/CommentContext';
import apiService from '../../../api/apiService';

function AdminCommentComponent() {

    const { comments, acceptComment, refuseComment, nextPage, previousPage, error } = useCommentsContext();

    const handleMark = async (id: number) => {
        try {
            await apiService(process.env.REACT_APP_MARK_AS_READ_ENDPOINT, "PUT", id);
        }
        catch (Error) {
            console.log(Error);
        }
    }

    if (error) return <p>{error}</p>
    return (
        <div className={`${styles.inner} my-2 border table-responsive`}>
            <table className={`${styles.tableFontSize} table-hover table mt-3 border`}>
                <thead>
                    <tr>
                        <th scope="col" className='text-center col-1'>Ad Soyad</th>
                        <th scope="col" className='text-center col-1'>E-Posta</th>
                        <th scope="col" className='text-center col-1'>Kullanıcı Türü</th>
                        <th scope="col" className='text-center col-1'>Aktif Mi</th>
                        <th scope="col">Puan</th>
                        <th scope="col" className='col-7'>Yorum</th>
                        <th scope="col" className='text-center col-1'></th>
                        <th scope="col" ></th>
                    </tr>
                </thead>
                <tbody className='border'>
                    {comments ?
                        (comments?.data.map((item: any, index: number) => (

                            <tr key={item.id}>
                                <td className={`${styles.tableInfos} text-center border`}>{item.userName}</td>
                                <td className={`${styles.tableInfos} text-center border`}>{item.userMail}</td>
                                <td className={`${styles.tableInfos} text-center border`}>{item.userType}</td>
                                <td className={`${styles.tableInfos} text-center border`}>{item.isActive === true ? "Evet" : "Hayır"}</td>
                                <td className={`${styles.tableInfos} text-center border`}>{item.starCount}</td>
                                <td className={`${styles.tableInfos} `}>{item.content}</td>
                                <td className={`${styles.tableInfos} text-center `}>
                                    {
                                        item.isNew === true ?
                                            (
                                                <div className={`${styles.newBtn} rounded-pill text-center p-1 bg-warning`} onMouseEnter={() => handleMark(item.id)}>
                                                    YENİ
                                                </div>

                                            ) : (<></>)
                                    }
                                </td>

                                <td>

                                    {item.isActive === true ?
                                        (
                                            <>
                                                <button onClick={() => refuseComment(item.id)} className={`${styles.actionNoBtn}`}>✖</button>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <button onClick={() => acceptComment(item.id)} className={`${styles.actionOkBtn}`}>✔</button>
                                            </>
                                        )
                                    }
                                </td>
                            </tr >

                        ))

                        )
                        :
                        (<></>)}
                </tbody>
            </table>
            <div className='d-flex justify-content-end my-4'>
                <button onClick={previousPage} className={`${styles.btn}`} style={{ width: "40px" }}>←</button>
                <button onClick={nextPage} className={`${styles.btn} ms-3`} style={{ width: "40px" }}>→</button>
            </div>
        </div>
    )
}

export default AdminCommentComponent