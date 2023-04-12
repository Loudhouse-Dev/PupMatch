import Logo from "/pp-logo.png";

export type CardType = {
  id: number;
  src: string;
  matched: boolean;
};

export type CardProps = {
  card: CardType;
  flipped: boolean;
  disabled: boolean;
  handleChoice: (card: CardType) => void;
}

const Card: React.FC<CardProps> = ({ card, flipped, disabled, handleChoice }) => {  
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card" key={card.id}>
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card front" className="front" />
        <img
          onClick={handleClick}
          src={Logo}
          alt="card back"
          className="back"
        />
      </div>
    </div>
  );
};

export default Card;