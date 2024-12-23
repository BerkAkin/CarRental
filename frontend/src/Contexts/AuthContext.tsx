import { createContext, useContext, useEffect, useState } from "react";
import apiService from "../api/apiService";
import { endpoints } from "../api/apiConfig";

interface AuthContextType {
    userTypeId: string | null;
    fetchUserType: () => void;
}


export const authContext = createContext<AuthContextType>({ userTypeId: null, fetchUserType: () => { } });


export const AuthContextProvider = ({ children }: any) => {

    const [userTypeId, setUserTypeId] = useState<string | null>(null);

    const fetchUserType = async () => {
        try {
            const response = await apiService(endpoints.userType, "GET");
            setUserTypeId(response.userTypeId)
            console.log(response)
        } catch (error) {
            console.log("AuthContextErr: ", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            fetchUserType();
        }
    }, []);

    return (
        <authContext.Provider value={{ userTypeId, fetchUserType }}>
            {children}
        </authContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("authContext must be used within a UserProvider");
    }
    return context;
}
