import { useQueries } from '@tanstack/react-query';
import { getDictionaryItems, DICTIONARY_ENDPOINTS } from '../api/Dictionaries';
import type { DictionaryItem } from '../types';

const createQuery = (id: string, endpoint: string) => ({
    queryKey: ['dictionary', id],
    queryFn: () => getDictionaryItems(endpoint),
    staleTime: 1000 * 60 * 10, 
});

export const useDictionaries = () => {
    const results = useQueries({
        queries: [
            createQuery('districts', DICTIONARY_ENDPOINTS.Districts),
            createQuery('ownerships', DICTIONARY_ENDPOINTS.Ownerships),
            createQuery('pressures', DICTIONARY_ENDPOINTS.Pressures),
            createQuery('materials', DICTIONARY_ENDPOINTS.Materials),
            createQuery('cuts', DICTIONARY_ENDPOINTS.Cuts),
            createQuery('ground', DICTIONARY_ENDPOINTS.GroundLevels),
            createQuery('objects', DICTIONARY_ENDPOINTS.ObjectNames),
        ]
    });

    const isLoading = results.some(query => query.isLoading);
    const isError = results.some(query => query.isError);

    return {
        districts: (results[0].data as DictionaryItem[]) || [],
        properties: (results[1].data as DictionaryItem[]) || [],
        pressures: (results[2].data as DictionaryItem[]) || [],
        materials: (results[3].data as DictionaryItem[]) || [],
        cuts: (results[4].data as DictionaryItem[]) || [],
        groundLevels: (results[5].data as DictionaryItem[]) || [],
        objectNames: (results[6].data as DictionaryItem[]) || [],
        isLoading,
        isError
    };
};