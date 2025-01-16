import { createContext, useCallback, useContext, useState } from "react";


const confirmContext = createContext<any>({});

export const ConfirmContextProvider = ({ children }: any) => {

    const [isVisible, setCPIsVisible] = useState(false);
    const [Message, setMessage] = useState("");
    const [func, setFunc] = useState<null | (() => void)>(null);

    const showConfirmation = useCallback((message: string, action: () => void) => {
        setMessage(message);
        setFunc(() => action);
        setCPIsVisible(true);
    }, []);

    const values = { isVisible, setCPIsVisible, Message, func, showConfirmation };


    return (
        <confirmContext.Provider value={values}>
            {children}
        </confirmContext.Provider>
    )
}

export const useConfirmContext = () => {
    const context = useContext(confirmContext);
    if (!context) {
        throw new Error("confirmContext must be used within a confirmContextProvider");
    }
    return context;
}
