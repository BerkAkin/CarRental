import axios from "axios";
import { BASE_URL, endpoints } from "./apiConfig";


let pendingRequests: any[] = [];
let isRefreshing = false;

async function refreshToken() {
    try {
        const refreshResponse = await axios.post(`${BASE_URL}${endpoints.refreshAccessToken}`, {}, { withCredentials: true });
        const newAccessToken = refreshResponse.data.accessToken;
        if (newAccessToken) {
            localStorage.setItem("accessToken", newAccessToken);
        }

        pendingRequests.forEach((request: any) => request());
        pendingRequests = [];
    } catch (error) {
        console.error("Token yenileme işlemi başarısız oldu", error);
    }
}


async function apiService(endpoint: string, method: string = "GET", data: any = null, params: string = "") {


    const url = `${BASE_URL}${endpoint}${params}`;
    const token = localStorage.getItem("accessToken") || "";

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

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



