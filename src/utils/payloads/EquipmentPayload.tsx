import { 
    CutTypesEnum, 
    EquipmentTypesEnum, 
    ColumnTypesEnum, 
    BackendEquipmentTypesEnum, 
    type CutType, 
    type EquipmentType,
    type ColumnType
} from '../../types';

export interface PipeDataEntry {
    id?: number; 
    type: typeof BackendEquipmentTypesEnum.PipeData;
    column_type: ColumnType;
    diameter: number;
    length: number;
    material_id?: number | null;
    groung_level_id?: number | null;
}

export interface ValveDataEntry {
    id?: number;
    type: typeof BackendEquipmentTypesEnum.ValveData;
    column_type: ColumnType;
    diameter: number;
    quantity: number;
    model_number?: string;
}

export interface GenericDataEntry {
    id?: number;
    type: typeof BackendEquipmentTypesEnum.GenericData;
    column_type: ColumnType;
    quantity: number;
}

export type EquipmentDataEntry = PipeDataEntry | ValveDataEntry | GenericDataEntry;

export interface EquipmentPayload {
    item_type: EquipmentType;
    description: string;
    data_entries: EquipmentDataEntry[];
}

export interface EquipmentUpdatePayload {
    description: string;
    data_entries: EquipmentDataEntry[];
}

export interface EquipmentFormState {
    id?: number; 
    diameter?: number | string;
    length?: number | string;
    material_id?: number | null;
    groung_level_id?: number | null;
    quantity?: number | string;
    model_number?: string;
}

const _formatEntry = (
    colType: ColumnType, 
    data: EquipmentFormState, 
    activeType: EquipmentType, 
    stripId: boolean
): EquipmentDataEntry => {
    
    const cleanData = { ...data };
    
    if (stripId) {
        delete cleanData.id;
    }
    
    const baseId = cleanData.id ? { id: cleanData.id } : {};

    if (activeType === EquipmentTypesEnum.Pipe) {
        return {
            ...baseId,
            type: BackendEquipmentTypesEnum.PipeData,
            column_type: colType,
            diameter: Number(cleanData.diameter || 0),
            length: Number(cleanData.length || 0),
            material_id: cleanData.material_id || null,
            groung_level_id: cleanData.groung_level_id || null
        };
    } else if (activeType === EquipmentTypesEnum.Valve) {
        return {
            ...baseId,
            type: BackendEquipmentTypesEnum.ValveData,
            column_type: colType,
            diameter: Number(cleanData.diameter || 0),
            quantity: Number(cleanData.quantity || 1),
            model_number: cleanData.model_number || undefined
        };
    }
    
    return {
        ...baseId,
        type: BackendEquipmentTypesEnum.GenericData,
        column_type: colType,
        quantity: Number(cleanData.quantity || 1)
    };
};

const _extractDataEntries = (
    activeType: EquipmentType,
    cardCutType: CutType,
    balanceData: EquipmentFormState,
    factDataList: EquipmentFormState[],
    cutData: EquipmentFormState,
    stripId: boolean
): EquipmentDataEntry[] => {
    const data_entries: EquipmentDataEntry[] = [];
    
    const add = (col: ColumnType, data: EquipmentFormState) => {
        if (Object.keys(data).length > 0) {
            data_entries.push(_formatEntry(col, data, activeType, stripId));
        }
    };

    if (cardCutType === CutTypesEnum.None) {
        add(ColumnTypesEnum.Balance, balanceData);
        factDataList.forEach(item => add(ColumnTypesEnum.Fact, item));
    } else if (cardCutType === CutTypesEnum.Full) {
        add(ColumnTypesEnum.Balance, balanceData);
        add(ColumnTypesEnum.Cut, cutData);
    } else if (cardCutType === CutTypesEnum.Partial) {
        add(ColumnTypesEnum.Balance, balanceData);
        factDataList.forEach(item => add(ColumnTypesEnum.Fact, item));
        add(ColumnTypesEnum.Cut, cutData);
    }

    return data_entries;
};

export const buildCreateEquipmentPayload = (
    description: string,
    activeType: EquipmentType,
    cardCutType: CutType,
    balanceData: EquipmentFormState,
    factDataList: EquipmentFormState[],
    cutData: EquipmentFormState
): EquipmentPayload => {
    return {
        item_type: activeType,
        description: description.trim(),
        data_entries: _extractDataEntries(activeType, cardCutType, balanceData, factDataList, cutData, true)
    };
};

export const buildUpdateEquipmentPayload = (
    description: string,
    activeType: EquipmentType,
    cardCutType: CutType,
    balanceData: EquipmentFormState,
    factDataList: EquipmentFormState[],
    cutData: EquipmentFormState
): EquipmentUpdatePayload => {
    return {
        description: description.trim(),
        data_entries: _extractDataEntries(activeType, cardCutType, balanceData, factDataList, cutData, false)
    };
};