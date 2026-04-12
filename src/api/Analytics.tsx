import axios from "axios";
import { type CardFilterPayload } from "../utils/payloads/FilterPayload";
import { API_BASE_URL } from "../constants";

export const analyticsApi = axios.create({
    baseURL: `${API_BASE_URL}/analytics`,
});

export interface PipeLengthStatsResponse {
    total_length: number; 
    count_cards: number
}

export const getPipesLengthStats = async (params: CardFilterPayload): Promise<PipeLengthStatsResponse> => {
    const response = await analyticsApi.get<PipeLengthStatsResponse>('/pipes-length', {
        params: params,
        // Если FastAPI не понимает массивы в формате "district_id[]=1&district_id[]=2", 
        // раскомментируйте настройку ниже, чтобы axios отправлял "district_id=1&district_id=2"
        
        paramsSerializer: { indexes: null }
    });
    
    return response.data;
};