import { createContext, useCallback, useContext, useEffect, useState } from "react";
import apiService from "../api/apiService";
import { endpoints } from "../api/apiConfig";

const FAQContext = createContext<any>({});

export const FAQContextProvider = ({ children }: any) => {
    const [FAQs, SetFAQs] = useState<any>();

    const fetchData = useCallback(async () => {
        const faqs = await apiService(endpoints.faq, "GET");
        SetFAQs(faqs);
    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData])


    const values = {
        FAQs: FAQs,
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