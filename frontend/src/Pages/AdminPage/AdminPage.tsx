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
import ConfirmationPopup from '../../Components/ConfirmationPopup/ConfirmationPopup';
import { ContactContextProvider } from '../../Contexts/ContactContext';
import AdminContactsComponent from '../../Components/AdminComponents/AdminContactsComponent/AdminContactsComponent';




function AdminPage() {

    const [isAdd, setIsAdd] = useState(false);
    const handleIsAdd = () => {
        setIsAdd(!isAdd);
    }

    return (
        <>
            <ConfirmationPopup />
            <div className={`container-fluid`}>
                <div className={` row`}>
                    <div className={`col-md-2 col-12 mt-4`}>
                        <ul className="nav d-md-flex flex-md-column pb-1" role="tablist">
                            <li className="nav-item" >
                                <a className={`${styles.navBtn} nav-link active`} id="disabled-tab-0" data-bs-toggle="tab" href="#disabled-tabpanel-0">BİLGİLERİM</a>
                            </li>
                            <li className="nav-item" >
                                <a className={`${styles.navBtn} nav-link`} id="disabled-tab-1" data-bs-toggle="tab" href="#disabled-tabpanel-1">SİTE AYARLARI</a>
                            </li>
                            <li className="nav-item">
                                <a className={`${styles.navBtn} nav-link`} id="disabled-tab-2" data-bs-toggle="tab" href="#disabled-tabpanel-2">MODELLER</a>
                            </li>
                            <li className="nav-item">
                                <a className={`${styles.navBtn} nav-link`} id="disabled-tab-3" data-bs-toggle="tab" href="#disabled-tabpanel-3">YORUMLAR</a>
                            </li>
                            <li className="nav-item">
                                <a className={`${styles.navBtn} nav-link`} id="disabled-tab-4" data-bs-toggle="tab" href="#disabled-tabpanel-4">İLETİŞİM</a>
                            </li>
                        </ul>
                    </div>
                    <div className={`${styles.section} col-md-10 col-12 border-start`}>
                        <div>
                            <div className={`${styles.contentPanelWrapper} tab-content`} id="tab-content">
                                <div className="tab-pane active" id="disabled-tabpanel-0" role="tabpanel" aria-labelledby="disabled-tab-0">
                                    <div className='container-fluid'>
                                        <div className='row pt-3'><h3>Bilgilerim</h3><hr /></div>
                                        <div className='row'>
                                            <UserInfoContextProvider>
                                                <UserProfileComponent />
                                            </UserInfoContextProvider>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="disabled-tabpanel-1" role="tabpanel" aria-labelledby="disabled-tab-1">
                                    <div className='container-fluid'>
                                        <div className='row pt-3'>
                                            <h3>Site Ayarları</h3><hr />
                                        </div>
                                        <div className='row'>
                                            <SiteSettingsContextProvider>
                                                <AdminSiteComponent />
                                            </SiteSettingsContextProvider>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="disabled-tabpanel-2" role="tabpanel" aria-labelledby="disabled-tab-2">
                                    <div className='container-fluid'>
                                        <div className='row pt-3'><h3>Modeller</h3><hr /></div>
                                        <div className='row'>
                                            {
                                                isAdd ?
                                                    (
                                                        <>


                                                            <TypesContextProvider>
                                                                <AdminModelAddComponent cancelFunc={handleIsAdd} />
                                                            </TypesContextProvider>
                                                        </>
                                                    )
                                                    :
                                                    (
                                                        <>


                                                            <TypesContextProvider>
                                                                <ModelsContextProvider>
                                                                    <AdminModelsComponent addNewFunc={handleIsAdd} />
                                                                </ModelsContextProvider>
                                                            </TypesContextProvider>
                                                        </>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="disabled-tabpanel-3" role="tabpanel" aria-labelledby="disabled-tab-3">
                                    <div className='container-fluid'>
                                        <div className='row pt-3'>
                                            <h3>Yorumlar</h3><hr />
                                        </div>
                                        <div className='row'>

                                            <CommentContextProvider>
                                                <AdminCommentComponent />
                                            </CommentContextProvider>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="disabled-tabpanel-4" role="tabpanel" aria-labelledby="disabled-tab-4">
                                    <div className='container-fluid'>
                                        <div className='row pt-3'><h3>İletişim İstekleri</h3><hr /></div>
                                        <div className='row'>
                                            <ContactContextProvider>
                                                <AdminContactsComponent />
                                            </ContactContextProvider>
                                        </div>
                                    </div>
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