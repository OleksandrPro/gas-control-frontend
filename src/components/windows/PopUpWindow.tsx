import React from 'react';

interface ModalProps {
    isOpen: boolean;           // Открыто или нет
    onClose: () => void;       // Функция закрытия (крестик или клик по фону)
    title: string;             // Заголовок окна
    children: React.ReactNode; // То, что мы положим внутрь (наша форма CreateCard)
}

// Стили для затемнения фона (Overlay)
const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный черный
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000 // Чтобы было поверх всего
};

// Стили для самого окна
const modalStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '600px', // Ширина как на макете
    maxWidth: '90%',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    position: 'relative'
};

// Стили для шапки
const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
};

const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

export const PopUpWindow = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div style={overlayStyle} onClick={onClose}>
            {/* stopPropagation нужен, чтобы клик по самому окну не закрывал его (не всплывал до оверлея) */}
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={headerStyle}>
                    <h3 style={{ margin: 0 }}>{title}</h3>
                    <button style={closeButtonStyle} onClick={onClose}>&times;</button>
                </div>
                {children}
            </div>
        </div>
    );
};