import axios from "axios";
import { BASE_URL, endpoints } from "./apiConfig";

async function apiService(endpoint: string, method: string = "GET", data: any = null) {

    const url = `${BASE_URL}${endpoint}`;
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
        }
        throw new Error("API request failed");
    }
}

export default apiService;