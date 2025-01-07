import { useState } from 'react'
import styles from "./styles.module.css"
import AdminCommentComponent from '../../Components/AdminComponents/AdminCommentComponent/AdminCommentComponent';
import { CommentContextProvider } from '../../Contexts/CommentContext';
import AdminSiteComponent from '../../Components/AdminComponents/AdminSiteComponent/AdminSiteComponent';
import { SiteSettingsContextProvider } from '../../Contexts/SiteSettingsContext';
import AdminModelAddComponent from '../../Components/AdminComponents/AdminModelAddComponent/AdminModelAddComponent';
import AdminModelsComponent from '../../Components/AdminComponents/AdminModelsComponent/AdminModelsComponent';
import { TypesContextProvider } from '../../Contexts/TypesContext';
import { ModelsContextProvider } from '../../Contexts/ModelsContext';
import { UserInfoContextProvider } from '../../Contexts/UserInfoContext';
import UserProfileComponent from '../../Components/UserProfileComponent/UserProfileComponent';




function AdminPage() {

    const [isAdd, setIsAdd] = useState(false);
    const handleIsAdd = () => {
        setIsAdd(!isAdd);
    }

    return (
        <>
            <div className={`container-fluid mt-4 pt-3 `}>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item " >
                        <a className={`${styles.navBtn} nav-link active`} id="disabled-tab-0" data-bs-toggle="tab" href="#disabled-tabpanel-0">Bilgilerim</a>
                    </li>
                    <li className="nav-item" >
                        <a className={`${styles.navBtn} nav-link`} id="disabled-tab-1" data-bs-toggle="tab" href="#disabled-tabpanel-1">Site Ayarları</a>
                    </li>
                    <li className="nav-item">
                        <a className={`${styles.navBtn} nav-link`} id="disabled-tab-2" data-bs-toggle="tab" href="#disabled-tabpanel-2">Modeller</a>
                    </li>
                    <li className="nav-item">
                        <a className={`${styles.navBtn} nav-link`} id="disabled-tab-5" data-bs-toggle="tab" href="#disabled-tabpanel-5">Yorumlar</a>
                    </li>
                </ul>

                <div className="tab-content" id="tab-content">
                    <div className="tab-pane active" id="disabled-tabpanel-0" role="tabpanel" aria-labelledby="disabled-tab-0">
                        <div className='container'>
                            <div className='row'>
                                <div className='container'>
                                    <UserInfoContextProvider>
                                        <UserProfileComponent />
                                    </UserInfoContextProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="disabled-tabpanel-1" role="tabpanel" aria-labelledby="disabled-tab-1">
                        <div className='container-fluid'>
                            <div className='row'>
                                <SiteSettingsContextProvider>
                                    <AdminSiteComponent />
                                </SiteSettingsContextProvider>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="disabled-tabpanel-2" role="tabpanel" aria-labelledby="disabled-tab-2">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='container-fluid mt-4'>
                                    {
                                        isAdd ?
                                            (
                                                <>
                                                    <button onClick={handleIsAdd} className={`${styles.addBtnCancel}`}>İptal Et</button>
                                                    <TypesContextProvider>
                                                        <AdminModelAddComponent />
                                                    </TypesContextProvider>
                                                </>
                                            )
                                            :
                                            (
                                                <>
                                                    <button onClick={handleIsAdd} className={`${styles.addBtn}`}>Yeni Model Ekle</button>
                                                    <TypesContextProvider>
                                                        <ModelsContextProvider>
                                                            <AdminModelsComponent />
                                                        </ModelsContextProvider>
                                                    </TypesContextProvider>
                                                </>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="disabled-tabpanel-5" role="tabpanel" aria-labelledby="disabled-tab-5">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div>
                                    <CommentContextProvider>
                                        <AdminCommentComponent />
                                    </CommentContextProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >


        </>
    )
}
export default AdminPage