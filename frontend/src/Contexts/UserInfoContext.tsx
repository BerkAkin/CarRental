import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import apiService from "../api/apiService";

interface InfoFormProps {
    email: string;
    phoneNum: string;
    createdAt: string;
}


const infoContext = createContext<any>({})

export const UserInfoContextProvider = ({ children }: any) => {

    const [userInfo, setUserInfo] = useState<InfoFormProps>();
    const [error, setError] = useState<string>();


    const fetchInfo = useCallback(async () => {
        try {
            const { data, status }: any = await apiService(process.env.REACT_APP_OWN_INFO_ENDPOINT, "GET");
            setUserInfo(data);
        } catch (error) {
            setError("Kullanıcı bilgileri alınırken hata oluştu. Lütfen yöneticinize başvurun")
            console.log(error)
        }
    }, [])

    useEffect(() => {
        fetchInfo();
    }, [fetchInfo])


    const values = useMemo(() => ({
        userInfo,
        error,
    }), [userInfo, error])

    return (
        <infoContext.Provider value={values}>
            {children}
        </infoContext.Provider>
    )
}

export const useInfoContext = () => {
    const context = useContext(infoContext);
    if (!context) {
        throw new Error("infoContext must be used within a InfoProvider");
    }
    return context;
}