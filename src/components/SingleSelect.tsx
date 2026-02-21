import { useState } from 'react';
import type { OptionItem } from '../types';

interface SingleSelectProps {
    label: string;
    items: OptionItem[]
    selectedItem: OptionItem | null;
    onSelect: (item: OptionItem) => void;
}

export const SingleSelect = ({ label, items, selectedItem, onSelect }: SingleSelectProps) => {

    const [isOpened, setIsOpened] = useState(false)

    const handleSelect = (item: OptionItem) => {
        onSelect(item);
        setIsOpened(false);
    };

    return (
        <div>
            <label>{label}</label>
            <button onClick={() => {setIsOpened(!isOpened)}}>
                {selectedItem ? selectedItem.text : "Choose..."}
            </button>
            {isOpened && (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            <button onClick={() => handleSelect(item)}>
                                {item.text}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}