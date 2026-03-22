export type CardBackend = {
    id: number;
    inventory_number: string;
    inventory_number_eskd: string;
    gas_pipeline_section: string;
    described_name: string;
    pressure_type_id: number;
    property_type_id: number;
    district_id: number;
    object_name_id: number;
    cut_type_id: number | null;
    build_date_dn: string;
    total_length_balance: number;
    total_length_fact: number;
    address: string;
    folder: string;
}

export type CardDisplay = {
    id: number;
    inventory_number: string;
    inventory_number_eskd: string;
    balanceName: string;
    gasPipelineSecion: string,
    pressure: string;
    address: string;
    district: string;
    property: string;
    objectName: string;
    buildDate: string;
    totalLengthBalance: number;
    totalLengthFact: number
    cut: string;
    folder: string;
}

export type CardUpdateData = Partial<Omit<CardBackend, 'id'>> & {
    cut_column_data_source?: "balance" | "fact" | null;
};

export const EquipmentTypesEnum = {
  Pipe: "pipe",
  Valve: "valve",
  Other: "other",
} as const satisfies Record<string, string>;

export type EquipmentType = (typeof EquipmentTypesEnum)[keyof typeof EquipmentTypesEnum];

export const BackendEquipmentTypesEnum = {
  PipeData: "pipe_data",
  ValveData: "valve_data",
  GenericData: "generic_data",
} as const satisfies Record<string, string>;

export type BackendEquipmentType = (typeof BackendEquipmentTypesEnum)[keyof typeof BackendEquipmentTypesEnum];

export const ColumnTypesEnum = {
  Balance: "BALANCE",
  Fact: "FACT",
  Cut: "CUT",
} as const satisfies Record<string, string>;

export type ColumnType = (typeof ColumnTypesEnum)[keyof typeof ColumnTypesEnum];

export type DictionaryItem = {
  id: number,
  value: string
}

export type PaginatedResponse<Type> = {
    items: Type[],

    total: number,
    current_page: number,
    total_pages: number,
    size: number,
}

export const CutTypesEnum = {
  None: "none",
  Full: "full",
  Partial: "partial",
} as const satisfies Record<string, string>;

export type CutType = (typeof CutTypesEnum)[keyof typeof CutTypesEnum];

export interface PipeData {
    id: number;
    length: number;
    diameter: number;
    material: string;
    placement: string;
    material_id?: number | null;
    groung_level_id?: number | null;
}

export interface ValveData {
    id: number;
    quantity: number;
    diameter: number;
}

export interface GenericData {
    id: number;
    quantity: number;
}

export type MappedDataEntry = PipeData | ValveData | GenericData;

export interface EquipmentRow {
    id: number;
    name: string;
    type: EquipmentType;
    balance: MappedDataEntry[];
    fact: MappedDataEntry[];
    cut: MappedDataEntry[];
}