import { createContext, useCallback, useContext, useEffect, useState } from "react";
import apiService from "../api/apiService";
import { endpoints } from "../api/apiConfig";
import { useToastManagerContext } from "./ToastManagerContext";



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
            const fetchedComments = await apiService(endpoints.comments + `?pageNumber=${page}`, "GET");
            setComments(fetchedComments);
        } catch (error) {
            console.log(error)
        }
    }, []);

    const updateCommentStatus = useCallback(
        async (endpoint: string, id: number) => {
            try {
                await apiService(endpoint, "PUT", id);
                await fetchComments(commentsCurrentPage);
                showToast("Yorum Görünürlüğü Değiştirildi", "s");
            } catch (error) {
                console.log(error);
                showToast("Yorum Görünürlüğü Değiştirilemedi", "d");
            }
        },
        [fetchComments]
    );

    useEffect(() => {
        fetchComments(commentsCurrentPage);
    }, [commentsCurrentPage, fetchComments]);


    const refuseComment = (id: number) => updateCommentStatus(endpoints.refuseComment, id);
    const acceptComment = (id: number) => updateCommentStatus(endpoints.acceptComment, id);


    const values = {
        refuseComment: refuseComment,
        acceptComment: acceptComment,
        comments: comments,
        nextPage: HandleNextCommentPage,
        previousPage: HandlePreviousCommentPage
    }

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