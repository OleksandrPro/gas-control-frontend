import type { DictionaryItem } from './types';


export const mapToSelectData = (items: DictionaryItem[] | undefined | null) => {
    if (!items || !Array.isArray(items)) return [];
    
    return items.map(item => ({
        value: item.id.toString(),
        label: item.value
    }));
};