import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import apiService from "../api/apiService";
import { endpoints } from "../api/apiConfig";
import { useToastManagerContext } from "./ToastManagerContext";
import { StatusHandler } from "../common/StatusHandler";



interface SingleComment {
    id: number;
    content: string;
    starCount: number;
    isActive: boolean;
    userName: string;
    userMail: string;
    userType: string;
}
interface Comments {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    data: SingleComment[]
}



export const CommentContext = createContext<any>({})

export const CommentContextProvider = ({ children }: any) => {

    const { showToast } = useToastManagerContext();

    const [comments, setComments] = useState<Comments>();
    const [commentsCurrentPage, setCommentsCurrentPage] = useState<number>(1);
    const [error, setError] = useState<string>();


    const HandleNextCommentPage = () => {
        if (commentsCurrentPage < (comments?.totalPages || 1)) {
            setCommentsCurrentPage(prev => prev + 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
    const HandlePreviousCommentPage = () => {
        if (commentsCurrentPage > 1) {
            setCommentsCurrentPage(prev => prev - 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }


    const fetchComments = useCallback(async (page: number) => {
        try {
            const { data, status }: any = await apiService(endpoints.comments + `?pageNumber=${page}`, "GET");
            setComments(data);
        } catch (error) {
            console.log(error)
            setError("Yorumlar yüklenirken bir hata meydana geldi. Lütfen yöneticinize başvurun");
        }

    }, []);

    const updateCommentStatus = useCallback(async (endpoint: string, id: number) => {
        try {
            const { data, status }: any = await apiService(endpoint, "PUT", id);
            await fetchComments(commentsCurrentPage);
            StatusHandler(status, data, showToast)
        } catch (error) {
            const { status, message }: any = error;
            StatusHandler(status, message, showToast)
        }
    },
        [fetchComments]
    );

    useEffect(() => {
        fetchComments(commentsCurrentPage);
    }, [commentsCurrentPage, fetchComments]);


    const refuseComment = useCallback((id: number) => { updateCommentStatus(endpoints.refuseComment, id) }, []);
    const acceptComment = useCallback((id: number) => { updateCommentStatus(endpoints.acceptComment, id) }, []);


    const values = useMemo(() => ({
        refuseComment,
        acceptComment,
        comments,
        error,
        nextPage: HandleNextCommentPage,
        previousPage: HandlePreviousCommentPage
    }), [comments, error, refuseComment, acceptComment, HandleNextCommentPage, HandlePreviousCommentPage])

    return <>

        <CommentContext.Provider value={values}>
            {children}
        </CommentContext.Provider>
    </>
}

export const useCommentsContext = () => {
    const context = useContext(CommentContext);
    if (!context) {
        throw new Error("useComments must be used within a CommentContextProvider");
    }
    return context;
}