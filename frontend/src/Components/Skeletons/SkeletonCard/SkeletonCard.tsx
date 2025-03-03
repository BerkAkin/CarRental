import styles from './styles.module.css';
import Skeleton from '../Skeleton/Skeleton';


function SkeletonCard() {

    return (

        <div className={`${styles.cardBg} border`}>
            <div className="container">
                <div className='row'>
                    <div className='col-12 my-5'>
                        <Skeleton />
                    </div>
                </div>
            </div>

            <div className='container mt-4 text-center' >
                <hr className={`${styles.hrColor}`} />
                <div className='row'>
                    <div className='col-3'>
                        <Skeleton />
                    </div>
                    <div className='col-3'>
                        <Skeleton />
                    </div>
                    <div className='col-3'>
                        <Skeleton />
                    </div>
                    <div className='col-3'>
                        <Skeleton />
                    </div>
                </div>
                <div className='row'>
                    <div className="col-3"><Skeleton /></div>
                    <div className="col-3"><Skeleton /></div>
                    <div className="col-3"><Skeleton /></div>
                    <div className="col-3"><Skeleton /></div>
                </div>
                <hr className={`${styles.hrColor}`} />
            </div>
            <div className='container mt-4 '>
                <div className='row '>
                    <div className='col-12 mb-3 ps-3'>
                        <Skeleton />
                    </div>
                </div>

            </div>
        </div>

    )
}

export default SkeletonCard