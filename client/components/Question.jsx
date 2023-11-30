import React, { useEffect, useState } from "react";
import styles from "./deck.module.css";
import Question from "./Question";

const Decks = ({ setSelectedDeck }) => {
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeckState] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleDeckClick = (deckNumber) => {
    fetch(`/api/deck/${deckNumber}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched deck data:", data);
        setQuestions(data.flashcards);
        setSelectedDeckState(data);
      })
      .catch((error) => console.error("Error fetching deck:", error));
  };

  const containerStyle = {
    textAlign: "center",
  };

  useEffect(() => {
    fetchDecks();
  }, [selectedDeck]);

  const fetchDecks = () => {
    fetch("/api/decks")
      .then((res) => res.json())
      .then((decks) => {
        setDecks(decks);
      })
      .catch((error) => console.error("Error fetching decks:", error));
  };

  function renderDeckBoxes() {
    return decks.map((deck, index) => (
      <div
        key={`deck${deck.id}`}
        className={styles["deck-box"]}
        onClick={() => handleDeckClick(deck.id)}
      >
        {`Deck ${deck.id}`}
        <p>{deck.description}</p>
      </div>
    ));
  }

  return (
    <div style={containerStyle}>
      <main>
        {selectedDeck ? (
          <Question flashcards={selectedDeck.flashcards} />
        ) : (
          renderDeckBoxes()
        )}
      </main>
    </div>
  );
};
export default Decks;
