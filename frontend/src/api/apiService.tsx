import axios from "axios";


let pendingRequests: any[] = [];
let isRefreshing = false;

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

async function refreshToken() {
    try {
        const refreshResponse = await axios.post(`${BASE_URL}${process.env.REACT_APP_REFRESH_ACCESS_TOKEN_ENDPOINT}`, {}, { withCredentials: true });
        const newAccessToken = refreshResponse.data.accessToken;
        if (newAccessToken) {
            localStorage.setItem("accessToken", newAccessToken);
        }

        pendingRequests.forEach((request: any) => request());
        pendingRequests = [];
    } catch (error: any) {
        if (error.status == 452) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("UserInfo");
            window.location.href = "/";
            await apiService(process.env.REACT_APP_LOGOUT_ENDPOINT);
            console.error("Token yenileme işlemi başarısız oldu", error);
        }
    }
}


async function apiService(endpoint: string | undefined, method: string = "GET", data: any = null, params: string = "", multipart?: boolean) {


    const url = `${BASE_URL}${endpoint}${params}`;
    const token = localStorage.getItem("accessToken") || "";


    let headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (multipart) {
        headers = {
            "Content-Type": "multipart/form-data",
        };
    }

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const request = async () => {
        try {
            const response = await axios({ method, url, data, headers, withCredentials: true });
            return { data: response.data, status: response.status };
        }
        catch (error: any) {

            if (axios.isAxiosError(error) && error.response?.status === 401) {
                if (endpoint === "/Favorites" && method === "POST") {
                    throw { status: error.response.status, message: error.response.data.message };
                }
                return new Promise<any>((resolve, reject) => {
                    pendingRequests.push(() => {
                        apiService(endpoint, method, data, params).then(resolve).catch(reject);
                    });
                    if (!isRefreshing) {
                        isRefreshing = true;
                        refreshToken().finally(() => {
                            isRefreshing = false;
                        });
                    }
                });
            }
            throw { status: error.response.status, message: error.response.data.message };
        }
    };


    return request();
}

export default apiService;



