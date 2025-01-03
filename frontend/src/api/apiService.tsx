import axios from "axios";
import { BASE_URL, endpoints } from "./apiConfig";

async function apiService(endpoint: string, method: string = "GET", data: any = null, params: string = "") {

    const url = `${BASE_URL}${endpoint}${params}`;
    const token = localStorage.getItem("accessToken") || "";

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    try {
        const response = await axios({ method, url, data, headers, withCredentials: true });
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error('Axios error: ', e.response?.data || e.message);
            throw new Error(e.response?.data.message);
        }

    }
}

export default apiService;