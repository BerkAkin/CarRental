import React from 'react'
import styles from "./styles.module.css"
import { useCommentsContext } from '../../../Contexts/CommentContext';
import apiService from '../../../api/apiService';
import { endpoints } from '../../../api/apiConfig';

function AdminCommentComponent() {

    const { comments, acceptComment, refuseComment, nextPage, previousPage, error } = useCommentsContext();

    const handleMark = async (id: number) => {
        try {
            console.log(id)
            await apiService(endpoints.markAsRead, "PUT", id);
        }
        catch (Error) {
            console.log(Error);
        }
    }

    if (error) return <p>{error}</p>
    return (
        <div className={`${styles.innerBG} my-2 border`}>
            <table className={`${styles.tableFontSize} table-striped table-hover table mt-3`}>
                <thead>
                    <tr>
                        <th scope="col" className='text-center col-1'>Ad Soyad</th>

                        <th scope="col" className='text-center col-1'>E-Posta</th>
                        <th scope="col" className='text-center col-1'>Kullanıcı Türü</th>
                        <th scope="col" className='text-center col-1'>Aktif Mi</th>
                        <th scope="col">Puan</th>
                        <th scope="col" className='col-7'>Yorum</th>
                        <th scope="col" className='text-center col-1'>Yeni Mi?</th>
                        <th scope="col" >İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {comments ?
                        (comments?.data.map((item: any, index: number) => (

                            <tr key={item.id}>
                                <td className={`${styles.tableInfos} text-center border`}>{item.userName}</td>
                                <td className={`${styles.tableInfos} text-center border`}>{item.userMail}</td>
                                <td className={`${styles.tableInfos} text-center border`}>{item.userType}</td>
                                <td className={`${styles.tableInfos} text-center border`}>{item.isActive === true ? "Evet" : "Hayır"}</td>
                                <td className={`${styles.tableInfos} text-center border`}>{item.starCount}</td>
                                <td className={`${styles.tableInfos} border`}>{item.content}</td>
                                <td className={`${styles.tableInfos} text-center border`}>
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
                                                <button onClick={() => refuseComment(item.id)} className={`${styles.actionNoBtn}`}>Reddet</button>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <button onClick={() => acceptComment(item.id)} className={`${styles.actionOkBtn}`}>Onayla</button>
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
                <button onClick={previousPage} className={`${styles.btn}`} style={{ width: "150px" }}>Önceki Sayfa</button>
                <button onClick={nextPage} className={`${styles.btn} ms-3`} style={{ width: "150px" }}>Sonraki Sayfa</button>
            </div>
        </div>
    )
}

export default AdminCommentComponent