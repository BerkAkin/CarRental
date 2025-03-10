import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import apiService from "../api/apiService";

interface Model {
    currentPage: number;
    data: [
        {
            id: number,
            slug: string,
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
            otherServices: string,
            otherFeatures: string,
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
    const [isLoading, setIsLoading] = useState<null | boolean>(true);
    const [modelCurrentPage, setModelCurrentPage] = useState<number>(1);
    const [searchText, setSearchText] = useState<string>("");


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

    const handleSearch = (text: string) => {
        setSearchText(text);
        setModelCurrentPage(1);
    };

    const fetchModels = useCallback(async (page: number = modelCurrentPage, search: string = searchText) => {
        setIsLoading(true)
        try {
            const { data, status }: any = await apiService(process.env.REACT_APP_MODELS_ENDPOINT + `?query=${search}&pageNumber=${page}`, "GET",)
            setModels(data);
        } catch (error) {
            console.log(error);
            setError("Modeller yüklenirken bir hata meydana geldi. Lütfen yöneticinize başvurun");
        }
        finally {
            setIsLoading(false)
        }
    }, [modelCurrentPage, searchText])


    useEffect(() => {
        fetchModels(modelCurrentPage, searchText);
    }, [fetchModels]);




    const values = useMemo(() => ({
        HandleNextModelPage,
        HandlePreviousModelPage,
        handleSearch,
        fetchModels,
        models,
        error,
        isLoading
    }), [models, error, isLoading]);


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