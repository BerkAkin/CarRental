import React from 'react'
import Accordion from '../Accordion/Accordion'
import styles from './styles.module.css'
import { useFAQContext } from '../../Contexts/FAQContext';

function FAQComponent() {

    const { error, FAQs } = useFAQContext();


    if (error) return <p>{error}</p>

    return (
        <div className={`${styles.AccordionContainerSizing} mt-4 pt-3`}>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mb-4'>
                        <h2 className={styles.headerColor}>Sık Sorulan Sorular</h2>
                        <hr></hr>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <Accordion data={FAQs} />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default FAQComponent