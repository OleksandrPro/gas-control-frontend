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

export const buildEquipmentPayload = (
    description: string,
    activeType: EquipmentType,
    cardCutType: CutType,
    balanceData: any,
    factDataList: any[],
    cutData: any
): EquipmentPayload => {
    
    const data_entries: EquipmentDataEntry[] = [];

    const formatEntry = (colType: ColumnType, data: EquipmentFormState): EquipmentDataEntry => {
        const baseId = data.id ? { id: data.id } : {};

        if (activeType === EquipmentTypesEnum.Pipe) {
            return {
                ...baseId,
                type: BackendEquipmentTypesEnum.PipeData,
                column_type: colType,
                diameter: Number(data.diameter || 0),
                length: Number(data.length || 0),
                material_id: data.material_id || null,
                groung_level_id: data.groung_level_id || null
            };
        } else if (activeType === EquipmentTypesEnum.Valve) {
            return {
                ...baseId,
                type: BackendEquipmentTypesEnum.ValveData,
                column_type: colType,
                diameter: Number(data.diameter || 0),
                quantity: Number(data.quantity || 1),
                model_number: data.model_number || undefined
            };
        }
        
        return {
            ...baseId,
            type: BackendEquipmentTypesEnum.GenericData,
            column_type: colType,
            quantity: Number(data.quantity || 1)
        };
    };

    if (cardCutType === CutTypesEnum.None) {
        if (balanceData && Object.keys(balanceData).length > 0) {
            data_entries.push(formatEntry(ColumnTypesEnum.Balance, balanceData));
        }
        factDataList.forEach(item => {
            if (Object.keys(item).length > 0) data_entries.push(formatEntry(ColumnTypesEnum.Fact, item));
        });
    } else if (cardCutType === CutTypesEnum.Full) {
        data_entries.push(formatEntry(ColumnTypesEnum.Balance, balanceData));
        data_entries.push(formatEntry(ColumnTypesEnum.Cut, cutData));
    } else if (cardCutType === CutTypesEnum.Partial) {
        data_entries.push(formatEntry(ColumnTypesEnum.Balance, balanceData));
        factDataList.forEach(item => {
            if (Object.keys(item).length > 0) data_entries.push(formatEntry(ColumnTypesEnum.Fact, item));
        });
        data_entries.push(formatEntry(ColumnTypesEnum.Cut, cutData));
    }

    return {
        item_type: activeType,
        description: description.trim(),
        data_entries: data_entries
    };
};