import { cardsApi } from "./Cards";

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