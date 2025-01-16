import { createContext, useCallback, useContext, useEffect } from "react";
import apiService from "../api/apiService";
import { endpoints } from "../api/apiConfig";


export const authContext = createContext<any>({});

export const AuthContextProvider = ({ children }: any) => {

    const fetchUserType = useCallback(async () => {
        try {
            const { data, status }: any = await apiService(endpoints.userType, "GET");
            localStorage.setItem("UserInfo", JSON.stringify(data));
        } catch (error) {
            console.log("ACxtFtchErr");
        }
    }, [])


    const checkUser = useCallback(async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("UserInfo") || " {}");
            const { data: result, status }: any = await apiService(endpoints.checkMe, "GET", null, `?RoleId=${userInfo?.roleId}&Email=${userInfo?.email}`);
            return result;
        } catch (error) {
            console.log("ACxtChkErr");
        }
        return false
    }, [])


    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            fetchUserType();
        }
    }, []);


    return (
        <authContext.Provider value={{ fetchUserType, checkUser }}>
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
