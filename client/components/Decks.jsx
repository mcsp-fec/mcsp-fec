import React, { useEffect, useState } from "react";
import styles from "./deck.module.css";
import CorrectButtons from "./correctButtons";

const Decks = () => {
  // State being used for the decks rendering on the Decks page
  const [decks, setDecks] = useState([]);
  const [questions, setQuestions] = useState([])
  // State to update the percentages displayed on decks. 
  const [deckPercentages, setDeckPercentages] = useState({})


  // -------------------------------- This code block will be for localStorage -----------------------------------------
    
  // Create the local storage code.

  useEffect(() => {
    // Retrieve the list of decks from our established database.
    fetch("/api/decks")
      .then((res) => res.json())
      .then((decksData) => {
        // Initialize or reinitialize local storage keys with .forEach to go through the database decks. 
        decksData.forEach((deck) => {
          // Set our key to the deck id, check to see if key exists by getItem and a conditional.
          const localStorageKey = `deck${deck.id}`;
          const existingData = localStorage.getItem(localStorageKey);
          if (!existingData) {
            localStorage.setItem(localStorageKey, 0);
          }
        });

        // Set initial values based on local storage, iterate through the fetch request, validate existingData, and update percentages accordingly
        const initialDeckValues = {};
        decksData.forEach((deck) => {
          const localStorageKey = `deck${deck.id}`
          const existingData = localStorage.getItem(localStorageKey)
          // If data exists, parse and return it to an integer.
          initialDeckValues[deck.id] = existingData ? parseInt(existingData) : 0
        })
        // Set the State of percentages with values obtained from local storage.
        setDeckPercentages(initialDeckValues)
      })
      .catch((error) => console.error("You goof'd again, MITCHELL!:", error));
  }, []);

  // Create the State update alongside event listener. 

  // Function to update the State of deck percentage
  const updateDeckPercentage = (deckId, count) => {
    // This line will update the state of deckPercentages using the previous state
    setDeckPercentages((prevPercentages) => ({
      // I learned that we spread the previous state to make sure that we don't mutate it.
      ...prevPercentages,
      // Update the specific DeckId with its new count value. 
      [deckId]: count,
    }))
  }

  // Take note that we are passing our updateDeckPercentage function into our button click below - that is where our parameters of deckId and count come into play.

  // Function to handle button click. This will update the local storage key associated with the deck Id 
  const handleDeckButtonClick = (deckId) => {
    const localStorageKey = `deck${deckId}`;
    const currentCount = parseInt(localStorage.getItem(localStorageKey) || 0)
    const updatedCount = currentCount + 1
    localStorage.setItem(localStorageKey, updatedCount)
    updateDeckPercentage(deckId, updatedCount) 
  }

  // --------------------------------- End of local storage block -------------------------------------------------------

  // HANDLER FOR SPECIFIC DECK ID
  const handleDeckClick = (deckNumber) => {
    fetch(`/api/deck/${deckNumber}`)
      .then((response) => response.json())
      .then((data) => {
      console.log(data)})
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
        <p>{deckPercentages[deck.id]}%</p>
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
      <main>{renderDeckBoxes()}</main>
      <CorrectButtons decks={decks} handleDeckButtonClick={handleDeckButtonClick}/>
    </div>
  );
};
export default Decks;
