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
        const datas = response.data;
        const status = response.status;
        return { data: datas, status: status }
    }
    catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const { status, data } = error.response;
                console.log(error);
                throw { status, message: data.message };
            }
            else {
                throw new Error("Sunucuya bağlanılamadı");
            }
        }
    }
}

export default apiService;