import styles from "./styles.module.css"
import { FAQContextProvider } from '../../Contexts/FAQContext'
import Accordion from '../../Components/Accordion/Accordion'

function FAQPage() {
    return (
        <div className={`${styles.AccordionContainerSizing} mt-4 pt-3`}>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mb-4'>
                        <h2 className={styles.headerColor}>Sık Sorulan Sorular</h2>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <FAQContextProvider>
                            <Accordion />
                        </FAQContextProvider>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQPage