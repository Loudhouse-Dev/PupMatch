import { useState, useEffect, SetStateAction } from "react";
import { cardImages } from "./Components/Characters";
import Header from "./Components/Header";
import Grid from "./Components/Grid";
import './App.css';
import Card, { CardType } from "./Components/Card";

type NullableCard = CardType | null;

const App = (): JSX.Element => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<NullableCard>(null);
  const [choiceTwo, setChoiceTwo] = useState<NullableCard>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [winner, setWinner] = useState<boolean | null>(null);
  const [exceeds, setExceeds] = useState<boolean | null>(null);

  // Shuffle the cards
  const shuffleCards = (): void => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
    setExceeds(false);
    setWinner(false);
    setDisabled(false);
  };

  // Call the shuffle card function at first render
  useEffect(() => {
    shuffleCards();
  }, []);

  // Handle Choice (Adding the clicked cards in the two slot states defined)
  const handleChoice = (card: CardType): void => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Check if the two cards clicked are matching
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards: CardType[]) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        backToDefault();
      } else {
        setTimeout(() => backToDefault(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset on every turn
  const backToDefault = (): void => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns((prevTurns) => prevTurns + 1);
  }

  useEffect(() => {
    setTimeout(() => {
      const isTrue = cards.every((card) => card.matched === true);
      if (turns >= 15) {
        setExceeds(true);
        // Disabled user from clicking on cards
        setDisabled(true);
      }
      else if (isTrue && cards.length > 0) {
        setWinner(true);
      }
    }, 500);
  }, [turns, cards, winner]);

  return (
    <div className="App">
      <Header turns={turns} onShuffle={shuffleCards} />
      {
        winner ? <div className='result'>Congratulations, You Win!!</div> : null
      }
      {
        exceeds ? <div className='result'>Uh Oh, You've Exhausted the Turns Counter!!</div> : null
      }
      <Grid cards={cards} choiceOne={choiceOne} choiceTwo={choiceTwo} disabled={disabled} handleChoice={handleChoice} />
    </div>
  )
}

export default App;