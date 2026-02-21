import { Link, useNavigate } from 'react-router-dom';

export interface Card {
    id: number
    inventory_number: string
    inventory_number_eskd: string
    address: string
    district: string
    property_type: string
    total_length_balance: string
    total_length_fact: string
    status: string
    cut_type: string
}

interface CardListProps {
    cards: Card[];
}

export const CardList = ({cards}: CardListProps) => {
    const navigate = useNavigate();

    const handleRowClick = (id: number) => {
        navigate(`/card-details/${id}`);
    };

    if (cards.length === 0) {
        return (
            <div>
                <p>0 cards found</p>
            </div>
        )
    }

  return (
    <div>
        <table>
            <thead>
                <tr>
                <th>Инв. номер</th>
                <th>Инв. номер ЕСКД</th>
                <th>Адрес</th>
                <th>Район</th>
                <th>Отрезка</th>
                <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {cards.map(card => (
                    <tr 
                        key={card.id}
                        onClick={() => handleRowClick(card.id)}
                    >
                        <td>{card.inventory_number}</td>
                        <td>{card.inventory_number_eskd}</td>
                        <td>{card.address}</td>
                        <td>{card.district}</td>
                        <td>{card.cut_type}</td>
                        <td>
                            <button>
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}