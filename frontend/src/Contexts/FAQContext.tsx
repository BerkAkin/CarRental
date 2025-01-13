import { createContext, useCallback, useContext, useEffect, useState } from "react";
import apiService from "../api/apiService";
import { endpoints } from "../api/apiConfig";


const FAQContext = createContext<any>({});

export const FAQContextProvider = ({ children }: any) => {
    const [FAQs, SetFAQs] = useState<any>();
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = useCallback(async () => {
        try {
            const faqs = await apiService(endpoints.faq, "GET");
            SetFAQs(faqs);
        }
        catch (error: any) {
            console.log(error);
            setError("Sık Sorulan Sorular yüklenirken bir hata meydana geldi. Lütfen yöneticinize başvurun");
        }
        finally {
            setLoading(false);
        }

    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData])


    const values = {
        FAQs: FAQs,
        error: error,
        loading: loading
    }

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