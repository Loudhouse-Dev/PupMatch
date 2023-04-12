type HeaderProps = {
  turns: number;
  onShuffle: () => void;
}

const Header: React.FC<HeaderProps> = ({ turns, onShuffle }) => {
  return (
    <>
      <h1 className="header">Find as Many Matches as Possible!</h1>
      <button onClick={onShuffle}>Start New Game</button>
      <div>
        <p className="turns">Turns: {turns}/15</p>
      </div>
    </>
  );
};

export default Header;