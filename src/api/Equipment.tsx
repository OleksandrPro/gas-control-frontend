import axios from "axios";
import { cardsApi } from "./Cards";
import { API_BASE_URL } from "../constants";


export const equipmentApi = axios.create({
    baseURL: `${API_BASE_URL}`
});

export interface EquipmentPayload {
    item_type: string;
    description: string;
    data_entries: any[];
}

export const getCardEquipment = async (cardId: number) => {
    const response = await cardsApi.get(`/${cardId}/equipment`);
    return response.data;
};

export const addEquipmentToCard = async (cardId: number, payload: EquipmentPayload) => {
    const response = await cardsApi.post(`/${cardId}/equipment`, payload);
    return response.data;
};

export const deleteEquipmentItem = async (itemId: number): Promise<void> => {
    await equipmentApi.delete(`/equipment-items/${itemId}`);
};

export const updateEquipmentItem = async (itemId: number, payload: any) => {
    // payload будет иметь тип { description: string, data_entries: array }
    // Замените axios.patch на ваш инстанс клиента (например, api.patch)
    const response = await equipmentApi.patch(`/equipment-items/${itemId}`, payload);
    return response.data;
};