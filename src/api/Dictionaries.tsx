import axios from "axios"
import type { DictionaryItem } from "../types"


export const dictionariesApi = axios.create({
    baseURL: '/api/dictionaries',
});

export const DICTIONARY_ENDPOINTS = {
    Districts: "/districts",
    Ownerships: "/property-types",
    ObjectNames: "/object-names",
    Cuts: "/cut-types",
    GroundLevels: "/ground-levels",
    Materials: "/pipe-materials",
    Pressures: "/pressure-types"
} as const;

export const getDictionaryItems = async (endpoint: string): Promise<DictionaryItem[]> => {
    const response = await dictionariesApi.get(endpoint);
    return response.data;
}

export const addDictionaryItem = async (endpoint: string, value: string): Promise<DictionaryItem> => {
    const response = await dictionariesApi.post(endpoint, { value });
    return response.data;
}

export const updateDictionaryItem = async (endpoint: string, item: DictionaryItem): Promise<DictionaryItem> => {
    const response = await dictionariesApi.put(`${endpoint}/${item.id}`, item);
    return response.data;
}

export const deleteDictionaryItem = async (endpoint: string, id: number): Promise<void> => {
    await dictionariesApi.delete(`${endpoint}/${id}`);
}