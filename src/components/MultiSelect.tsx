import { useState } from 'react';
import { SelectionOption } from './SelectionOption';
import type { OptionItem } from '../types';

interface MultiSelectProps {
    labelText: string
    textPlaceholder: string
    items: OptionItem[]
}

const MultiSelectStyle = {
  display: "inline-flex",
  gap: "6px"
}

export const MultiSelect = ({labelText, textPlaceholder, items}: MultiSelectProps) => {

    const [isOpened, setIsOpened] = useState(false)
    const [selectedItems, setSelectedItems] = useState<OptionItem[]>([])

    const handleToggleDropdown = () => {
        const nextState = !isOpened
        setIsOpened(nextState)
    }

    const handleOptions = (item: OptionItem, isSelected: boolean) => {
        setSelectedItems(
            isSelected ? [...selectedItems, item] : selectedItems.filter(i => i.id !== item.id)
        )
    }

    return (
        <div>
            <label>{labelText}</label>
            <button onClick={handleToggleDropdown}>
                {selectedItems.length > 0 
                    ? `Selected: ${selectedItems.length}` 
                    : textPlaceholder}
            </button>
            {isOpened && (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            <SelectionOption 
                                item={item}
                                itemClickCallback={handleOptions}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}