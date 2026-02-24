import { MOCK_DICTIONARIES } from '../MockData';

export const useDictionaries = () => {
    return {
        districts: MOCK_DICTIONARIES["Districts"] || [],
        properties: MOCK_DICTIONARIES["Ownership"] || [],
        pressures: MOCK_DICTIONARIES["Pressures"] || [],
        materials: MOCK_DICTIONARIES["Materials"] || [],
        cuts: MOCK_DICTIONARIES["Cut types"] || [],
        groundLevels: MOCK_DICTIONARIES["GroundLevels"] || [],
        objectNames: MOCK_DICTIONARIES["Object Names"] || [],
    };
};