import axios from "axios"
import type { PaginatedResponse, CardBackend, CardUpdateData } from "../types"


export const cardsApi = axios.create({
    baseURL: '/api/cards',
});

export const getCards = async (): Promise<PaginatedResponse<CardBackend>> => {
    const response = await cardsApi.get("");
    return response.data;
}

export const getCard = async (id: number): Promise<CardBackend> => {
    const response = await cardsApi.get(`/${id}`);
    return response.data;
}

export const updateCard = async (id: number, newData: CardUpdateData): Promise<CardBackend> => {
    const response = await cardsApi.patch(`/${id}`, newData);
    return response.data;
}