
import Skeleton from '../Skeleton/Skeleton'
import styles from './styles.module.css'

function SkeletonFAQ() {




    return (
        <div className={`${styles.AccordionContainerSizing} mt-4 pt-3`}>
            <div className='container mt-4 pt-3'>
                {/*  <div className='row'>
                    <div className='col-12 mb-4'>
                        <h2 className={styles.headerColor}>Sık Sorulan Sorular</h2>
                        <hr></hr>
                    </div>
                </div> */}
                <div className={`${styles.accordionContainerSkeletonSize} row`}>
                    <div className='col-12'>
                        <Skeleton />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default SkeletonFAQ