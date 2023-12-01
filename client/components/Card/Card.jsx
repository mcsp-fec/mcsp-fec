import { useState } from "react";
import styles from "./Card.module.css";

const Card = ({ deckArr }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);

  let deckCount = deckArr.length;

  let handleClick = () => {
    if (cardIndex < deckCount - 1) {
      setCardIndex(cardIndex + 1);
      setRevealAnswer(false);
    } else {
      //{What should we do if it is the last card in the deckArr, maybe have a "You have completed this Flashcard Deck."}
    }
  };

  return (
    <div>
      <div className={styles.card}>
        <p>{deckArr[cardIndex].question}</p>
        {revealAnswer && <p>{deckArr[cardIndex].answer}</p>}
      </div>
      {!revealAnswer && (
        <button
          className={styles["answer-button"]}
          onClick={() => setRevealAnswer(true)}
        >
          REVEAL ANSWER
        </button>
      )}
      {revealAnswer && (
        <button className={styles["next-card-button"]} onClick={handleClick}>
          NEXT QUESTION
        </button>
      )}
    </div>
  );
};

export default Card;

/* 
            //   deckArr.map((card, index) => (
        //     <div
        //       key={`card${card.id}`}
        //     >
        //       <p>{card.question}</p>
        //     </div>
        //   )))


        */
