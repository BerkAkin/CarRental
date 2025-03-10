import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import apiService from "../api/apiService";
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
    isNew: boolean;
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
            const { data, status }: any = await apiService(process.env.REACT_APP_COMMENTS_ENDPOINT + `?pageNumber=${page || 1}`, "GET");
            setComments(data);
        } catch (error) {
            console.log(error)
            setError("Yorumlar yüklenirken bir hata meydana geldi. Lütfen yöneticinize başvurun");
        }

    }, []);

    const updateCommentStatus = useCallback(async (endpoint: string | undefined, id: number) => {
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


    const refuseComment = useCallback((id: number) => { updateCommentStatus(process.env.REACT_APP_REFUSE_COMMENT_ENDPOINT, id) }, []);
    const acceptComment = useCallback((id: number) => { updateCommentStatus(process.env.REACT_APP_ACCEPT_COMMENT_ENDPOINT, id) }, []);


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