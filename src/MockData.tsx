import type { Card, CardDisplay } from "./types";

export const MOCK_DICTIONARIES: Record<string, string[]> = {
    "Districts": ["Central", "Northern", "Southern", "Western"],
    "Materials": ["Steel", "Polyethylene", "Cast iron"],
    "Cut types": ["Full", "Partial", "No cut"],
    "Ownership": ["Private", "State", "Municipal"],
    "Pressures": ["High", "Medium", "Low"],
    "GroundLevels": ["Underground", "Above ground"],
    "Object Names": ["Distributive gaspipeline", "Enter gaspipeline"],
    "Equipment": ["Pipe", "Valve", "Crane"]
};

export const MOCK_FULL_CARDS: Card[] = Array.from({ length: 15 }, (_, i) => {
  const id = i + 1;
  
  return {
    id: id,
    inventory_number: `0301*high***${id}`,
    inventory_number_eskd: `1634500003301000${id.toString().padStart(2, '0')}`,
    gas_pipeline_section: `0301*high***${id} - High pressure gas pipeline to Malyshev plant - State property`,
    described_name: `Fixed asset: 0301*high***${id} - High pressure gas pipeline to Malyshev plant`,
    address: `High pressure gas pipeline to Malyshev plant from PRP Glybokyi Yar to Morozov st., section ${id}`,
    folder: `${8 + (i % 3)}`,
    total_length_balance: (2.17085 + i * 0.1).toFixed(5).replace('.', ','),
    total_length_fact: (2.17085 + i * 0.1).toFixed(5).replace('.', ','),
    build_date_dn: new Date(1962, 5, 1 + i),
    
    district: i % 2 === 0 ? "Central" : "Southern",
    property: i % 3 === 0 ? "Private" : "State",
    object_name: "Distribution gas pipeline",
    pressure: i % 2 === 0 ? "High" : "Medium",
    cut: i % 4 === 0 ? "Partial" : "None"
  };
});

export const MOCK_CARDS: CardDisplay[] = MOCK_FULL_CARDS.map((card) => ({
  id: card.id,
  inventory_number: card.inventory_number,
  inventory_number_eskd: card.inventory_number_eskd,
  address: card.address,
  district: card.district,
  property: card.property,
  cut: card.cut
}));

export const getCard = (id: number): Card | undefined => {
  return MOCK_FULL_CARDS.find((card) => card.id === id);
};