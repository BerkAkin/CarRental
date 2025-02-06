import { createContext, useContext } from "react";


interface contactContext {

}

const contactContext = createContext<any>("");

export const ContactContextProvider = ({ children }: any) => {



    const values = {

    }

    return (
        <contactContext.Provider value={values}>
            {children}
        </contactContext.Provider>
    )
}


export const useConfirmContext = () => {
    const context = useContext(contactContext);
    if (!context) {
        throw new Error("contactContext must be used within a contactContextProvider");
    }
    return context;
}
