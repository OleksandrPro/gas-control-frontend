import type { CardBackend, CardDisplay, DictionaryItem } from "../types";

interface DictionariesContext {
    districts: DictionaryItem[];
    pressures: DictionaryItem[];
    properties: DictionaryItem[];
    objectNames: DictionaryItem[];
    cuts: DictionaryItem[];
}

const getDictValue = (dict: DictionaryItem[], id: number | null): string => {
    if (id === null) return "-";
    const item = dict.find(d => d.id === id);
    return item ? item.value : "Unknown";
};

export const mapCardToDisplay = (card: CardBackend, dicts: DictionariesContext): CardDisplay => {
    return {
        id: card.id,
        inventory_number: card.inventory_number,
        inventory_number_eskd: card.inventory_number_eskd,
        
        balanceName: card.described_name,
        gasPipelineSecion: card.gas_pipeline_section,
        
        totalLengthBalance: card.total_length_balance,
        totalLengthFact: card.total_length_fact,
        buildDate: card.build_date_dn,
        address: card.address,
        folder: card.folder,
        
        district: getDictValue(dicts.districts, card.district_id),
        pressure: getDictValue(dicts.pressures, card.pressure_type_id),
        property: getDictValue(dicts.properties, card.property_type_id),
        objectName: getDictValue(dicts.objectNames, card.object_name_id),
        cut: getDictValue(dicts.cuts, card.cut_type_id),
    };
};