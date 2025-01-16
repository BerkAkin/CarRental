import { createContext, useCallback, useContext, useState } from "react";
import ToastMessage from "../Components/ToastMessage/ToastMessage";

interface ToastContextType {
    showToast: (message: string, type: string) => void;
}

interface Toast {
    id: number;
    message: string;
    type: string;
}

const ToastManagerContext = createContext<ToastContextType | undefined>(undefined);

export const ToastManagerContextProvider = ({ children }: any) => {

    const [toast, setToast] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: string) => {
        const id = Date.now();
        setToast((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToast((prev) => prev.filter((toast) => toast.id !== id));
        }, 2000);

    }, [])


    return (
        <ToastManagerContext.Provider value={{ showToast }}>
            {children}
            {toast.map((toast) => (
                <ToastMessage
                    key={toast.id}
                    Message={toast.message}
                    Type={toast.type}
                />
            ))}
        </ToastManagerContext.Provider>
    )
}

export const useToastManagerContext = () => {
    const context = useContext(ToastManagerContext);
    if (!context) {
        throw new Error("ToastManagerContext sadece ToastManagerContextProvider içinde kullanılabilir");
    }
    return context;
}