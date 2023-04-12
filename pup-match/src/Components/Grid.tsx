
import Card from "./Card";

type GridProps = {
    cards: Card[];
    choiceOne: Card | null;
    choiceTwo: Card | null;
    disabled: boolean;
    handleChoice: (card: Card) => void;
}

const Grid: React.FC<GridProps> = ({ cards, choiceOne, choiceTwo, disabled, handleChoice }) => {
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