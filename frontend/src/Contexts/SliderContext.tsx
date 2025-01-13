import { createContext, ReactNode, useContext, useEffect, useState, } from "react";
import apiService from "../api/apiService";
import { endpoints } from "../api/apiConfig";

interface TextData {
    content: string;
    starCount: number;
    userName: string;
    userType: string;
}

interface ModelData {
    id: number;
    image: string;
    type: string;
    brandName: string;
    personCount: number;
    gear: string;
    luggageCount: number;
    doorCount: number;
    price: string;
}

interface SliderContextType {
    textData: TextData[] | null,
    modelData: ModelData[] | null
    sliderLoading: boolean
    sliderError: string
}


const sliderDataContext = createContext<SliderContextType | null>(null);


export const SliderDataProvider = ({ children }: { children: ReactNode }) => {

    const [textData, setTextData] = useState<TextData[] | null>(null);
    const [modelData, setModelData] = useState<ModelData[] | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiService(endpoints.commentsLatest, "GET");
                setTextData(data);
            }
            catch (error) {
                console.log(error)
                setError("Yorumlar yüklenirken bir hata meydana geldi. Lütfen yöneticinize başvurun");
            }
            finally {
                setLoading(false);
            }

        }
        fetchData();
    }, []);

    const values: SliderContextType = {
        textData,
        modelData,
        sliderLoading: loading,
        sliderError: error,
    };

    return (
        <sliderDataContext.Provider value={values}>
            {children}
        </sliderDataContext.Provider>
    );
};


export const useSliderContext = () => {
    const context = useContext(sliderDataContext);
    if (!context) {
        throw new Error("sliderDataContext must be used within a UserProvider");
    }
    return context;
};
