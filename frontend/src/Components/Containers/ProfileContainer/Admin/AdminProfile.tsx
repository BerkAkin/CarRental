import React from 'react'
import styles from './styles.module.css';


function AdminProfile() {
    return (
        <>


            <div className={`container-fluid mt-4 pt-3 `}>

                <ul className="nav nav-tabs mt-2" role="tablist">
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
                        <a className={`${styles.navBtn} nav-link`} id="disabled-tab-3" data-bs-toggle="tab" href="#disabled-tabpanel-3">Kullanıcılar</a>
                    </li>
                    <li className="nav-item">
                        <a className={`${styles.navBtn} nav-link`} id="disabled-tab-4" data-bs-toggle="tab" href="#disabled-tabpanel-4">İletişim Mesajları</a>
                    </li>
                    <li className="nav-item">
                        <a className={`${styles.navBtn} nav-link`} id="disabled-tab-5" data-bs-toggle="tab" href="#disabled-tabpanel-5">Yorumlar</a>
                    </li>

                </ul>

                <div className="tab-content pt-3" id="tab-content">
                    <div className="tab-pane active" id="disabled-tabpanel-0" role="tabpanel" aria-labelledby="disabled-tab-0">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div>
                                    Bilgilerim
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="disabled-tabpanel-1" role="tabpanel" aria-labelledby="disabled-tab-1">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div>
                                    Site Ayarları
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="disabled-tabpanel-2" role="tabpanel" aria-labelledby="disabled-tab-2">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div>
                                    Modeller
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="disabled-tabpanel-3" role="tabpanel" aria-labelledby="disabled-tab-3">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div>
                                    Kullanıcılar
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="disabled-tabpanel-4" role="tabpanel" aria-labelledby="disabled-tab-4">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div>
                                    İletişim Mesajları
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="disabled-tabpanel-5" role="tabpanel" aria-labelledby="disabled-tab-5">
                        <div className='container-fluid'>
                            <div className='row'>
                                <div>
                                    Yorumlar
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >


        </>
    )
}

export default AdminProfile