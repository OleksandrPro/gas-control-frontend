import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardDetails } from "../components/CardDetails";
import { type Card } from "../types";

import { getCard } from "../MockData";


export const CardDetailsPage = () => {
    const [card, setCard] = useState<Card>()
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const foundCard = getCard(Number(id));
            setCard(foundCard);
        }
    }, [id])

    if (!card) {
        return <div style={{ padding: '20px' }}>Loading or Card Not Found...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Card Details for ID: {card.id}</h2>
            <CardDetails cardData={card} />
        </div>
    );
};