import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import apiService from "../api/apiService";



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
        const { data: dataF, status: statusF }: any = await apiService(process.env.REACT_APP_FUELS_ENDPOINT, "GET");
        const { data: dataG, status: statusG }: any = await apiService(process.env.REACT_APP_GEARS_ENDPOINT, "GET");
        const { data: dataC, status: statusC }: any = await apiService(process.env.REACT_APP_CAR_TYPES_ENDPOINT, "GET");

        setFuels(dataF);
        setGears(dataG);
        setCarTypes(dataC);
    }, []);

    useEffect(() => {
        fetchTypes();
    }, [fetchTypes]);

    const values = useMemo(() => ({
        fuels,
        gears,
        carTypes
    }), [fuels, gears, carTypes])



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