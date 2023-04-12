import Logo from "../assets/pp-logo.png";

type Card = {
  id: number;
  src: string;
};

type CardProps = {
  card: Card;
  flipped: boolean;
  disabled: boolean;
  handleChoice: (card: Card) => void;
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