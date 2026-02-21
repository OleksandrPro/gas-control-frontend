import { useState, useEffect } from 'react';
import { Input } from '../Input';
import { SingleSelect } from '../SingleSelect';
import { Button } from '../Button';
import type { OptionItem } from '../../types';

interface CreateCardProps {
    onClose: () => void;
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

const OptionStyle = {
  display: "inline-flex",
  gap: "6px"
}

export const CreateCard = ({ onClose }: CreateCardProps) => {
  const [districts, setDistricts] = useState<OptionItem[]>([]);
  const [properties, setProperties] = useState<OptionItem[]>([]);
  const [cuts, setCuts] = useState<OptionItem[]>([]);

    const [formData, setFormData] = useState({
        invNumber: '',
        eskdNumber: '',
        address: '',
        district: null as OptionItem | null,
        property: null as OptionItem | null,
        cutType: null as OptionItem | null,
        buildDate: ''
    });

    useEffect(() => {
    // Api async calls
    // const fetchData = async () => { ... }
    
    setDistricts(getDistricts());
    setProperties(getProperties());
    setCuts(getCuts());
    }, []);

    const cardCreationHandler = () => {
        console.log('Creating card...')
        onClose();
    }

    const formGridStyle = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px"
    };

    const fullWidthStyle = {
        gridColumn: "1 / -1"
    };
  
    return (
        <div style={formGridStyle}>
            <Input 
                label='Инвентарный номер' 
                value={formData.invNumber}
                onChange={(e) => setFormData({...formData, invNumber: e.target.value})}
            />
            <Input 
                label='Инв. номер (ЕСКД)'
                value={formData.eskdNumber}
                onChange={(e) => setFormData({...formData, eskdNumber: e.target.value})}
            />
            <div style={fullWidthStyle}>
                <Input 
                    label='Адрес'
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
            </div>
            <SingleSelect 
                label='Район' 
                items={districts} 
                selectedItem={formData.district}
                onSelect={(item) => setFormData({...formData, district: item})}
            />
            <SingleSelect 
                label='Собственность' 
                items={properties}
                selectedItem={formData.property}
                onSelect={(item) => setFormData({...formData, property: item})}
            />
            <SingleSelect 
                label='Тип отрезки' 
                items={cuts}
                selectedItem={formData.cutType}
                onSelect={(item) => setFormData({...formData, cutType: item})}
            />
            <Input 
                label='Дата постройки' 
                type="date"
                value={formData.buildDate}
                onChange={(e) => setFormData({...formData, buildDate: e.target.value})}
            />
            <div style={fullWidthStyle}>
                <Button text='Create card' onClick={cardCreationHandler}/>
            </div>
        </div>
    )
}