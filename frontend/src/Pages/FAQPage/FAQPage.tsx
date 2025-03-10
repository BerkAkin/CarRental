import { FAQContextProvider } from '../../Contexts/FAQContext'
import FAQComponent from "../../Components/FAQComponent/FAQComponent";

function FAQPage() {

    return (
        <div>
            <FAQContextProvider>
                <FAQComponent />
            </FAQContextProvider>
        </div>
    )
}

export default FAQPage