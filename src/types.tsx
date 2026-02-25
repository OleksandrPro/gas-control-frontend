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
  totalLength: number;
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