import React from 'react'
import styles from "./styles.module.css";
import { ModelsContextProvider, useModelsContext } from '../../Contexts/ModelsContext';
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