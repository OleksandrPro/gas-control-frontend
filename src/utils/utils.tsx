import { type DictionaryItem, type CutType, CutTypesEnum } from '../types';


export const mapToSelectData = (items: DictionaryItem[] | undefined | null) => {
    if (!items || !Array.isArray(items)) return [];
    
    return items.map(item => ({
        value: item.id.toString(),
        label: item.value
    }));
};

export const determineCutMode = (value: string | undefined): CutType => {
    if (!value) return CutTypesEnum.None;
    const valLower = value.toLowerCase();
    
    if (valLower.includes('полн') || valLower.includes('повн') || valLower.includes('full')) return CutTypesEnum.Full;
    if (valLower.includes('част') || valLower.includes('partial') || valLower.includes('part')) return CutTypesEnum.Partial;
    if (valLower.includes('без') || valLower.includes('нема') || valLower.includes('no cut') || valLower.includes('no')) return CutTypesEnum.None;
    
    return CutTypesEnum.None;
};