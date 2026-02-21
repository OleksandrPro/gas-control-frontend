interface InputProps {
    label: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: 'text' | 'date';
}

const InputStyle = {
    display: "grid",
    gap: "10px"
}

export const Input = ({ label, placeholder, value, onChange, type = 'text' }: InputProps) => {
    return (
        <div style={InputStyle}>
            <label>{label}</label>
            <input type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}/>
        </div>
    )
}