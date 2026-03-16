import { type NumberFilterPayload } from "../../components/ui/NumberFilter";

export interface CardFilterPayload {
    inventory_number_like?: string;
    district_id?: number[];
    property_type_id?: number[];
    object_name_id?: number[];
    pressure_type_id?: number[];
    folder?: string[];
    cut_type_id?: number[];
    pipe_material_id?: number[];
    groung_level_id?: number[];
    column_type?: string[];
    pipe_diameter_equal?: number;
    pipe_diameter_min?: number;
    pipe_diameter_max?: number;
}

export interface FilterState {
    searchQuery: string;
    districtsFilter: string[];
    ownershipFilter: string[];
    objectsFilter: string[];
    pressuresFilter: string[];
    folderFilter: string;
    cutsFilter: string[];
    materialsFilter: string[];
    groundLevelsFilter: string[];
    columnTypesFilter: string[];
    diameterFilter: NumberFilterPayload | null;
}

export const buildFilterPayload = (state: FilterState): CardFilterPayload => {
    const payload: CardFilterPayload = {};

    if (state.searchQuery.trim()) payload.inventory_number_like = state.searchQuery.trim();

    if (state.districtsFilter.length > 0) payload.district_id = state.districtsFilter.map(Number);
    if (state.ownershipFilter.length > 0) payload.property_type_id = state.ownershipFilter.map(Number);
    if (state.objectsFilter.length > 0) payload.object_name_id = state.objectsFilter.map(Number);
    if (state.pressuresFilter.length > 0) payload.pressure_type_id = state.pressuresFilter.map(Number);
    if (state.cutsFilter.length > 0) payload.cut_type_id = state.cutsFilter.map(Number);
    
    if (state.folderFilter.trim()) payload.folder = [state.folderFilter.trim()];

    if (state.materialsFilter.length > 0) payload.pipe_material_id = state.materialsFilter.map(Number);
    if (state.groundLevelsFilter.length > 0) payload.groung_level_id = state.groundLevelsFilter.map(Number);
    if (state.columnTypesFilter.length > 0) payload.column_type = state.columnTypesFilter;

    if (state.diameterFilter?.equal !== undefined) payload.pipe_diameter_equal = state.diameterFilter.equal;
    if (state.diameterFilter?.min !== undefined) payload.pipe_diameter_min = state.diameterFilter.min;
    if (state.diameterFilter?.max !== undefined) payload.pipe_diameter_max = state.diameterFilter.max;

    return payload;
};