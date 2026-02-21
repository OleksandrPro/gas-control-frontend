import { useState } from 'react';
import type { OptionItem } from '../types';

interface SelectionOptionProps {
    item: OptionItem
    itemClickCallback: (item: OptionItem, selected: boolean) => void;
}

const OptionStyle = {
  display: "inline-flex",
  gap: "6px"
}

export const SelectionOption = ({item, itemClickCallback}: SelectionOptionProps) => {

    const [isSelected, setIsSelected] = useState(false)

    const handleSelection = () => {
        const nextState = !isSelected
        setIsSelected(nextState)
        itemClickCallback(item, nextState)
    }

    return (
        <div style={OptionStyle}>
            <p>{isSelected ? '✅' : '☐'}</p>
            <button onClick={handleSelection}>{item.text}</button>
        </div>
    )
}