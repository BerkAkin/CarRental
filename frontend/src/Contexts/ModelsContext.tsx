import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import apiService from "../api/apiService";
import { endpoints } from "../api/apiConfig";



interface Model {
    currentPage: number;
    data: [
        {
            id: number,
            carType: {
                id: number,
                car: string
            },
            fuelType: {
                id: number,
                fuel: string
            },
            gearType: {
                id: number,
                gear: string
            },
            brandName: string,
            modelName: string,
            description: string,
            personCount: number,
            luggageCount: number,
            doorCount: number,
            price: number,
            otherServices: [
            ],
            otherFeatures: [
            ],
            imageDirectory: string,
        }
    ];
    totalPages: number;
    totalRecords: number;
}


const modelsContext = createContext<any>({})

export const ModelsContextProvider = ({ children }: any) => {

    const [models, setModels] = useState<Model>();
    const [error, setError] = useState<string | null>(null);
    const [modelCurrentPage, setModelCurrentPage] = useState<number>(1);


    const HandleNextModelPage = () => {
        if (modelCurrentPage < (models?.totalPages || 1)) {
            setModelCurrentPage(prev => prev + 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
    const HandlePreviousModelPage = () => {
        if (modelCurrentPage > 1) {
            setModelCurrentPage(prev => prev - 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    const fetchModels = useCallback(async (page: number) => {
        try {
            const { data, status }: any = await apiService(endpoints.models + `?pageNumber=${page}`, "GET",)
            setModels(data);
        } catch (error) {
            console.log(error);
            setError("Modeller yüklenirken bir hata meydana geldi. Lütfen yöneticinize başvurun");
        }

    }, [])


    useEffect(() => {
        fetchModels(modelCurrentPage);
    }, [modelCurrentPage, fetchModels]);


    const values = useMemo(() => ({
        HandleNextModelPage,
        HandlePreviousModelPage,
        models,
        error
    }), [models, error]);


    return (
        <modelsContext.Provider value={values}>
            {children}
        </modelsContext.Provider>
    )
}



export const useModelsContext = () => {
    const context = useContext(modelsContext);
    if (!context) {
        throw new Error("ModelsContext sadece ModelsContextProviderda kullanılabilir");
    }
    return context
}