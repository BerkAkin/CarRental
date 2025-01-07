import { createContext, useCallback, useContext, useEffect, useState } from "react";
import apiService from "../api/apiService";
import { endpoints } from "../api/apiConfig";
import { useToastManagerContext } from "./ToastManagerContext";

interface InfoFormProps {
    email: string;
    phoneNum: string;
    createdAt: string;
}


const infoContext = createContext<any>({})

export const UserInfoContextProvider = ({ children }: any) => {
    const { showToast } = useToastManagerContext();

    const [userInfo, setUserInfo] = useState<InfoFormProps>();


    const fetchInfo = useCallback(async () => {
        try {
            const infoResponse = await apiService(endpoints.ownInfo, "GET");
            setUserInfo(infoResponse);
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        fetchInfo();
    }, [fetchInfo])

    const updateUserInfo = async (values: InfoFormProps) => {
        try {
            await apiService(endpoints.ownInfo, "PUT", values);
            showToast("Bilgiler Güncellendi", "s")
        } catch (error) {
            console.log(error);
            showToast("Bilgiler Güncellenemedi", "d")

        }
    }

    const values = {
        userInfo: userInfo,
        updateUserInfo: updateUserInfo
    }

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