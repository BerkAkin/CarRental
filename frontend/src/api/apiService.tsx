import axios from "axios";
import { BASE_URL, endpoints } from "./apiConfig";

async function apiService(endpoint: string, method: string = "GET", data: any = null) {
    const url = `${BASE_URL}${endpoint}`;

    try {
        const response = await axios({ method, url, data });
        return response.data;
    } catch (e) {
        throw new Error(`${e}`);
    }
}

export default apiService;