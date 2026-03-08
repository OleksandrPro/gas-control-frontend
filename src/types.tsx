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

export type Card = {
  id: number,
  inventory_number: string;
  inventory_number_eskd: string;
  gas_pipeline_section: string;
  described_name: string;
  address: string;
  folder: string;
  total_length_balance: string;
  total_length_fact: string;
  build_date_dn: Date

  district: string;
  property: string;
  object_name: string;
  pressure: string;
  cut: string;
};

export type CardUpdateData = Partial<Omit<CardBackend, 'id'>>;

export type EquipmentType = 'pipe' | 'valve' | 'other';
export type ColumnType = 'balance' | 'fact' | 'inCut';

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