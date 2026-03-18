export interface CreateCardFormState {
    inventory_number?: string;
    inventory_number_eskd?: string;
    gas_pipeline_section?: string;
    address?: string;
    described_name?: string;
    folder?: string;
    total_length_balance?: number | string;
    total_length_fact?: number | string;
    build_date_dn?: Date | null;
    
    district_id?: string | null;
    pressure_type_id?: string | null;
    object_name_id?: string | null;
    property_type_id?: string | null;
    cut_type_id?: string | null;
}

const formatDateForBackend = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const parseNumber = (val: number | string | undefined | null): number | null => {
    if (val === undefined || val === null || val === '') return null;
    return Number(String(val).replace(',', '.'));
};

export const buildCardPayload = (
    formData: CreateCardFormState, 
    dictsData: Record<string, any[]>
) => {
    const { districtsData, pressuresData, objectNamesData, propertiesData, cutsData } = dictsData;

    return {
        inventory_number: formData.inventory_number?.trim(),
        inventory_number_eskd: formData.inventory_number_eskd?.trim() || "",
        gas_pipeline_section: formData.gas_pipeline_section?.trim() || "",
        address: formData.address?.trim() || "",
        described_name: formData.described_name?.trim() || "",
        folder: formData.folder?.trim() || "",
        
        total_length_balance: parseNumber(formData.total_length_balance) || 0,
        total_length_fact: parseNumber(formData.total_length_fact),
        build_date_dn: formData.build_date_dn ? formatDateForBackend(formData.build_date_dn) : null,

        district_id: Number(formData.district_id || districtsData[0]?.value),
        pressure_type_id: Number(formData.pressure_type_id || pressuresData[0]?.value),
        object_name_id: Number(formData.object_name_id || objectNamesData[0]?.value),
        property_type_id: Number(formData.property_type_id || propertiesData[0]?.value),
        
        cut_type_id: Number(formData.cut_type_id || cutsData[0]?.value),
    };
};