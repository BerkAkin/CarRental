import styles from "./styles.module.css"
import { useConfirmContext } from '../../Contexts/ConfirmationContext';



function ConfirmationPopup() {

    const { isVisible, setCPIsVisible, Message, func } = useConfirmContext();
    if (!isVisible) return null;

    return (

        <>
            <div className={`${styles.background}`}>
                <div>
                    <div className={`container ${styles.popupContainer} `}>
                        <div className={`row h-75 ${styles.popupInner}  `}>
                            <p className={`${styles.parag} text-center h-100 align-items-center d-flex `}>{Message}</p>
                        </div>

                        <div className={`row h-25`}>
                            <div className='col-6 p-0'>
                                <button onClick={() => { func(); setCPIsVisible(false); }} className={`${styles.btn}`}>Onayla</button>
                            </div>
                            <div className='col-6 p-0'>
                                <button onClick={() => setCPIsVisible(false)} className={`${styles.btnCancel}`}> İptal</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default ConfirmationPopup