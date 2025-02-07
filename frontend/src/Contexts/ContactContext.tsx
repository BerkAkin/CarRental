import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import apiService from "../api/apiService";
import { endpoints } from "../api/apiConfig";


interface SingleContact {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    permission: string;
    platform: string;
    isRead: boolean;
}


interface Contacts {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    data: SingleContact[]
}

const contactContext = createContext<any>({});

export const ContactContextProvider = ({ children }: any) => {

    const [contacts, setContacts] = useState<Contacts>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [error, setError] = useState<string>();

    const handleNextPage = () => {
        if (currentPage < (contacts?.totalPages || 1)) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
    }

    const fetchContacts = useCallback(async (page: number) => {
        try {
            const { data, status }: any = await apiService(endpoints.contactUs + `?pageNumber=${page || 1}`, "GET")
            setContacts(data);
        }
        catch (error) {
            console.log(error)
            setError("İletişim istekleri yüklenirken bir hata meydana geldi. Lütfen yöneticinize başvurun");
        }
    }, [])

    useEffect(() => {
        fetchContacts(currentPage);
    }, [currentPage, fetchContacts])


    const values = useMemo(() => ({
        handleNextPage,
        handlePreviousPage,
        contacts,
        error
    }), [handleNextPage, handlePreviousPage, contacts, error]);


    return (
        <contactContext.Provider value={values}>
            {children}
        </contactContext.Provider>
    )
}


export const useContactContext = () => {
    const context = useContext(contactContext);
    if (!context) {
        throw new Error("contactContext must be used within a contactContextProvider");
    }
    return context;
}
