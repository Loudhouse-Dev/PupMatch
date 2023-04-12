import React from "react";
import Card, { CardType } from "./Card";


type GridProps = {
  cards: CardType[];
  choiceOne: CardType | null;
  choiceTwo: CardType | null;
  disabled: boolean;
  handleChoice: (card: CardType) => void;
}

const Grid: React.FC<GridProps> = ({ cards, choiceOne, choiceTwo,  disabled, handleChoice }) => {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <div className="card" key={card.id}>
          <Card
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  )
}

export default Grid;
