import React, { useEffect, useState } from "react";
import styles from "./deck.module.css";
import Question from "./Question";

const Decks = () => {
  // State being used for the decks rendering on the Decks page
  const [decks, setDecks] = useState([]);

  const handleDeckClick = (deckNumber) => {
    fetch(`/api/deck/${deckNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions("Fetched deck data:", data);
        setSelectedDeck(data);
      })
      .catch((error) => console.error("Error fetching deck:", error));
  };

  const renderDeckBoxes = () => {
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
  };

  const containerStyle = {
    textAlign: "center",
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = () => {
    fetch("/api/decks")
      .then((res) => res.json())
      .then((decks) => {
        setDecks(decks);
      })
      .catch((error) => console.error("Error fetching decks:", error));
  };

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
};
export default Decks;
