import { useState, useEffect } from 'react';
import { Button } from "../components/Button";
import { Searchbar } from "./Searchbar";
import { MultiSelect } from "./MultiSelect";
import type { OptionItem } from '../types';

const NavbarStyle = {
  display: "inline-flex",
  gap: "6px"
}

const FilterbarStyle = {
  display: "grid",
  gap: "6px"
}

const getDistricts = (): OptionItem[] => {
  return [
    { id: 1, text: "Центральный" },
    { id: 2, text: "Северный" }
  ];
};

const getProperties = (): OptionItem[] => {
  return [
    { id: 1, text: "Частная" },
    { id: 2, text: "Государственная" }
  ];
};

const getCuts = (): OptionItem[] => {
  return [
    { id: 1, text: "Полная" },
    { id: 2, text: "Частичная" }
  ];
};

export const Filterbar = () => {
  const [isOpened, setIsOpened] = useState(false)

  const [districts, setDistricts] = useState<OptionItem[]>([]);
  const [properties, setProperties] = useState<OptionItem[]>([]);
  const [cuts, setCuts] = useState<OptionItem[]>([]);

  useEffect(() => {
    // Api async calls
    // const fetchData = async () => { ... }
    
    setDistricts(getDistricts());
    setProperties(getProperties());
    setCuts(getCuts());
  }, []);

  const toggleFilters = () => {
    console.log("Toggle filters");
    setIsOpened(!isOpened)
  }
  const onSearchHandler = () => console.log("Searching...");

  return (
    <div style={FilterbarStyle}>
      <div style={NavbarStyle}>
        <Searchbar placeHolder="Search..." text="O" onClick={onSearchHandler}/>
        <Button text="Filters" onClick={toggleFilters}/>
        <Button text="Search" onClick={onSearchHandler}/>
      </div>
      {isOpened && (
        <div style={NavbarStyle}>
          <MultiSelect labelText="District" textPlaceholder="Choose districts..." items={districts}/>
          <MultiSelect labelText="Property" textPlaceholder="Choose properties..." items={properties}/>
          <MultiSelect labelText="Cut" textPlaceholder="Choose cuts..." items={cuts}/>
        </div>
      )}
    </div>
  )
}