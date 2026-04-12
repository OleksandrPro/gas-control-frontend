import axios from "axios"
import type { CardBackend, CardUpdateData } from "../types"
import { API_BASE_URL } from "../constants";


export const cardsApi = axios.create({
    baseURL: `${API_BASE_URL}/cards`,
});

export const getCards = async (params: any = {}) => {
    const response = await cardsApi.get("", { 
        params,
        paramsSerializer: { indexes: null } 
    });
    return response.data;
};

export const getCard = async (id: number): Promise<CardBackend> => {
    const response = await cardsApi.get(`/${id}`);
    return response.data;
}

export const updateCard = async (id: number, newData: CardUpdateData): Promise<CardBackend> => {
    const response = await cardsApi.patch(`/${id}`, newData);
    return response.data;
}

export const createCard = async (payload: any) => {
    const response = await cardsApi.post('', payload);
    return response.data;
};

export const deleteCard = async (id: number): Promise<void> => {
    await cardsApi.delete(`/${id}`);
}