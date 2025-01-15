import React from 'react'
import styles from "./styles.module.css"
import { useCommentsContext } from '../../../Contexts/CommentContext';

function AdminCommentComponent() {

    const { comments, acceptComment, refuseComment, nextPage, previousPage, error } = useCommentsContext();

    if (error) return <p>{error}</p>
    return (
        <div>
            <table className="table-striped table-hover table m-0 mt-4">
                <thead>
                    <tr>
                        <th scope="col">Ad Soyad</th>
                        <th scope="col">E-Posta</th>
                        <th scope="col">Kullanıcı Türü</th>
                        <th scope="col">Aktif Mi</th>
                        <th scope="col">Puan</th>
                        <th scope="col">Yorum</th>
                        <th scope="col">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {comments ?
                        (comments?.data.map((item: any, index: number) => (

                            <tr key={index}>
                                <td scope="row">{item.userName}</td>
                                <td>{item.userMail}</td>
                                <td>{item.userType}</td>
                                <td>{item.isActive === true ? "Evet" : "Hayır"}</td>
                                <td>{item.starCount}</td>
                                <td>{item.content}</td>
                                <td>
                                    {item.isActive === true ?
                                        (
                                            <>
                                                <button onClick={() => refuseComment(item.id)} className={`${styles.actionNoBtn} mx-2`}>Reddet</button>
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
            <div className='d-flex justify-content-end mt-4'>
                <button onClick={previousPage} className={`${styles.btn}`} style={{ width: "150px" }}>Önceki Sayfa</button>
                <button onClick={nextPage} className={`${styles.btn} ms-3`} style={{ width: "150px" }}>Sonraki Sayfa</button>
            </div>
        </div>
    )
}

export default AdminCommentComponent