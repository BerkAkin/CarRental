import { ModelsContextProvider } from '../../Contexts/ModelsContext';
import ModelsComponent from '../../Components/ModelsComponent/ModelsComponent';

function ModelsPage() {

    return (
        <>
            <ModelsContextProvider>
                <ModelsComponent />
            </ModelsContextProvider>
        </>
    )
}

export default ModelsPage