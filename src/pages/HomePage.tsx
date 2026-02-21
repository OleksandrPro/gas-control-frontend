import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Filterbar } from "../components/Filterbar";
import { CardList } from "../components/CardList";
import type { Card } from "../components/CardList";
import { PopUpWindow } from "../components/windows/PopUpWindow";
import { CreateCard } from "../components/windows/CreateCard";

const getCards = (): Card[] => {
  return [
    {
      id: 1,
      inventory_number: "CARD-001",
      inventory_number_eskd: "ESKD-100200",
      address: "ул. Газовиков, д. 10",
      district: "Центральный",
      property_type: "Личная",
      total_length_balance: "150.5",
      total_length_fact: "148.2",
      status: "На балансе",
      cut_type: "Без отрезки"
    },
    {
      id: 2,
      inventory_number: "CARD-002",
      inventory_number_eskd: "ESKD-100201",
      address: "ул. Энергетиков, д. 5",
      district: "Северный",
      property_type: "Государственная",
      total_length_balance: "210.0",
      total_length_fact: "210.0",
      status: "В работе",
      cut_type: "Полная"
    },
    {
      id: 3,
      inventory_number: "CARD-003",
      inventory_number_eskd: "ESKD-100205",
      address: "пр. Ленина, д. 12",
      district: "Южный",
      property_type: "Коммунальная",
      total_length_balance: "85.3",
      total_length_fact: "80.0",
      status: "На балансе",
      cut_type: "Частичная"
    }
  ];
};

export const Home = () => {

  const [filteredCards, setFilteredCards] = useState<Card[]>([])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // Api async calls
    // const fetchData = async () => { ... }
    
    setFilteredCards(getCards());
  }, []);

  return (
    <div>
        <h1>Home Page</h1>
        <div>
            <h2>Cards</h2>
            <div>
                <Button onClick={() => setIsCreateModalOpen(true)} text="Create" />
            </div>
            <Filterbar/>
            <CardList cards={filteredCards}/>

            <PopUpWindow 
                title="Card creation" 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)}
            >
                <CreateCard onClose={() => setIsCreateModalOpen(false)} />
            </PopUpWindow>
        </div>
    </div>
  )
}