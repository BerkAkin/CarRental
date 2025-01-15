import { createContext, useCallback, useContext, useEffect, useState } from "react";
import apiService from "../api/apiService";
import { endpoints } from "../api/apiConfig";



interface Gears {
    id: number;
    gear: string;
}
interface Fuels {
    id: number;
    fuel: string;
}
interface Cars {
    id: number;
    car: string;
}


const Types = createContext<any>({});


export const TypesContextProvider = ({ children }: any) => {

    const [gears, setGears] = useState<Gears[]>();
    const [carTypes, setCarTypes] = useState<Cars[]>();
    const [fuels, setFuels] = useState<Fuels[]>();

    const fetchTypes = useCallback(async () => {
        const { data: dataF, status: statusF }: any = await apiService(endpoints.fuels, "GET");
        const { data: dataG, status: statusG }: any = await apiService(endpoints.gears, "GET");
        const { data: dataC, status: statusC }: any = await apiService(endpoints.carTypes, "GET");

        setFuels(dataF);
        setGears(dataG);
        setCarTypes(dataC);
    }, []);

    useEffect(() => {
        fetchTypes();
    }, [fetchTypes]);

    const values = {
        fuels: fuels,
        gears: gears,
        carTypes: carTypes
    }
    return (
        <Types.Provider value={values} >
            {children}
        </Types.Provider >
    )
}

export const useTypesContext = () => {
    const context = useContext(Types);
    if (!context) {
        throw new Error("TypesContext must be used within a TypesContextProvider");
    }
    return context;
}