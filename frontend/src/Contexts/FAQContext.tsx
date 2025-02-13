import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import apiService from "../api/apiService";
import { endpoints } from "../api/apiConfig";


const FAQContext = createContext<any>({});

export const FAQContextProvider = ({ children }: any) => {
    const [FAQs, SetFAQs] = useState<any>();
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const { data, status }: any = await apiService(endpoints.faq, "GET");
            SetFAQs(data);
        }
        catch (error: any) {
            console.log(error);
            setError("Sık Sorulan Sorular yüklenirken bir hata meydana geldi. Lütfen yöneticinize başvurun");
        }


    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData])


    const values = useMemo(() => ({
        FAQs,
        error,
    }), [FAQs, error])

    return (
        <FAQContext.Provider value={values}>
            {children}
        </FAQContext.Provider>
    )
}

export const useFAQContext = () => {
    const context = useContext(FAQContext);
    if (!context) {
        throw new Error("useFAQs must be used within a FAQContextProvider");
    }
    return context;
}