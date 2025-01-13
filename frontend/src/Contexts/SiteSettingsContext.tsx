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
    const [loading, setLoading] = useState<boolean>(true);

    const fetchSettings = useCallback(async () => {
        try {
            const fetchedSettings = await apiService(endpoints.homepage, "GET");
            setSettings(fetchedSettings);
        }
        catch (error) {
            console.log(error);
            setError("Modeller yüklenirken bir hata meydana geldi. Lütfen yöneticinize başvurun");
        }
        finally {
            setLoading(false);
        }

    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const updateMainText = async (values: SettingsMainTextProps) => {
        try {
            const dataToSend = { Text: values.text };
            await apiService(endpoints.mainText + `${values.id}`, "PUT", dataToSend);
            showToast("Metin Güncellendi", "s");
        } catch (error) {
            console.log(error)
            showToast("Metin Güncellenemedi", "d");

        }

    }
    const updateServiceTexts = async (values: SettingsServicesTextProps) => {
        try {
            const dataToSend = { Title: values.title, Content: values.content, Icon: values.icon }
            await apiService(endpoints.serviceText + `${values.id}`, "PUT", dataToSend);
            showToast("Hizmet Metni Güncellendi", "s");

        } catch (error) {
            console.log(error)
            showToast("Hizmet Metni Güncellenemedi", "d");
        }
    }
    const updateReasonTexts = async (values: SettingsReasonTextProps) => {
        try {
            const dataToSend = { Title: values.title, Content: values.content }
            await apiService(endpoints.reasonText + `${values.id}`, "PUT", dataToSend);
            showToast("Sebep Metni Güncellendi", "s");
        } catch (error) {
            console.log(error)
            showToast("Sebep Metni Güncellenemedi", "d");
        }
    }



    // `values` objesi `useMemo` ile optimize ediliyor
    const values = useMemo(
        () => ({
            updateMainText,
            updateServiceTexts,
            updateReasonTexts,
            settings,
            error: error,
            loading: loading
        }),
        [updateMainText, updateServiceTexts, updateReasonTexts, settings]
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
