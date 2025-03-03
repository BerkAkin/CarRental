import Skeleton from '../Skeleton/Skeleton'
import styles from './styles.module.css'


function SkeletonDetail() {



    return (
        <>
            <div className={`${styles.innerContainer} container my-5 py-5`}>
                <div className='row'>
                    <div className='col-12'>
                        <h2 className='d-inline'><Skeleton /></h2>
                        <p className='mt-3 d-block'>
                            <Skeleton />
                        </p>
                    </div>

                </div>


                <div className='row mt-4'>
                    <div className='col-lg-6 col-12 d-flex align-items-center'>
                        <Skeleton />
                    </div>

                    <div className='col-lg-6 col-12 '>
                        <div className='row h-50 mt-4'>
                            <div className={`col-sm-6 col-12`}>
                                <div className='row text-center'>
                                    <h3>Araç Bilgisi</h3>
                                </div>
                                <div className='row'>
                                    <div className='container mt-1'>

                                        <div className='row'>
                                            <div className='col-12 d-flex justify-content-center align-items-center'>
                                                <Skeleton />
                                                <div className='ps-2'>
                                                    <p className='d-inline'><Skeleton /></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 d-flex justify-content-center align-items-center'>
                                                <Skeleton />
                                                <div className='ps-2 mt-2'>
                                                    <p className='d-inline'><Skeleton /></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 d-flex justify-content-center align-items-center'>
                                                <Skeleton />
                                                <div className='ps-2'>
                                                    <p className='d-inline'><Skeleton /></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 d-flex justify-content-center align-items-center'>
                                                <Skeleton />
                                                <div className='ps-2'>
                                                    <p className='d-inline'><Skeleton /></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-sm-6 m-sm-0 mt-5'>
                                <div className='row text-center'>
                                    <h3>Kapasite Bilgisi</h3>
                                </div>
                                <div className='row'>
                                    <div className='container mt-1'>
                                        <div className='row'>
                                            <div className='col-4 d-flex justify-content-center'>
                                                <p></p>
                                                <Skeleton />
                                            </div>
                                            <div className='col-4 d-flex justify-content-center'>
                                                <Skeleton />
                                            </div>
                                            <div className='col-4 d-flex justify-content-center '>
                                                <Skeleton />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-4 d-flex justify-content-center '>
                                                <Skeleton />
                                            </div>
                                            <div className='col-4 d-flex justify-content-center'>
                                                <Skeleton />
                                            </div>
                                            <div className='col-4 d-flex justify-content-center'>
                                                <Skeleton />
                                            </div>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row h-50 mt-4'>
                            <div className='col-sm-6 col-12'>
                                <div className='row text-center'>
                                    <h3>Araç Özellikleri</h3>
                                </div>
                                <div className='row'>
                                    <div className='container mt-1'>
                                        <Skeleton />
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6 col-12 m-sm-0 mt-5'>
                                <div className='row text-center'>
                                    <h3> Diğer Hizmetler</h3>
                                </div>
                                <div className='row'>
                                    <div className='container mt-1'>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <Skeleton />
                                            </div>

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

export default SkeletonDetail