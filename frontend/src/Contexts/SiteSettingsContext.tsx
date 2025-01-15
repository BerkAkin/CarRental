import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import apiService from "../api/apiService";
import { endpoints } from "../api/apiConfig";
import { useToastManagerContext } from "./ToastManagerContext";


interface SettingsMainTextProps {
    id: number;
    text: string;
}
interface SettingsReasonTextProps {
    id: number;
    title: string;
    content: string;
}
interface SettingsServicesTextProps {
    id: number;
    title: string;
    content: string;
    icon: string;
}
interface SiteSettings {
    mainText: SettingsMainTextProps[];
    services: SettingsServicesTextProps[];
    reasons: SettingsReasonTextProps[];
}

const SiteSettingsContext = createContext<any>({});



export const SiteSettingsContextProvider = ({ children }: any) => {

    const { showToast } = useToastManagerContext();

    const [settings, setSettings] = useState<SiteSettings>();
    const [error, setError] = useState<string>();


    const fetchSettings = useCallback(async () => {
        try {
            const { data, status }: any = await apiService(endpoints.homepage, "GET");
            setSettings(data);
        }
        catch (error) {
            console.log(error);
            setError("Modeller yüklenirken bir hata meydana geldi. Lütfen yöneticinize başvurun");
        }

    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);





    // `values` objesi `useMemo` ile optimize ediliyor
    const values = useMemo(
        () => ({
            settings,
            error: error,

        }),
        [settings]
    );

    return (
        <SiteSettingsContext.Provider value={values}>

            {children}

        </SiteSettingsContext.Provider>
    )
}

export const useSiteSettingsContext = () => {
    const context = useContext(SiteSettingsContext);
    if (!context) {
        throw new Error("useSiteSettingsContext must be used within a SiteSettingsContextProvider");
    }
    return context;
}
