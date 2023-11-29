import React, { useEffect, useState } from "react";


import Navigation from "./Navigation/Navigation.jsx";
import About from "./About";
import Home from "./Home/Home.jsx";
import Decks from "./Decks";

import "../app.css";

const App = () => {
  const [decks, setDecks] = useState([]);

  // Create a state that will manage local data
  // const [localData, setLocalData] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [percentage, setPercentage] = useState(0)

  const deckName = 'deckOne'
  const sampleSize = 25
  const roundedPercentage = Math.floor(percentage)

  // Function to handle setting data in the local storage 
  const handleSetData = () => {

    // Increase correct count
    setCorrectCount((prevCount) => {
    const newCount = prevCount + 1
    console.log(newCount)
    return newCount
  })

    // Generate a unique key based on dynamic variable
    const newKey = deckName

    // Generate a new unique value based on dynamic variable
    const newPercentage = ((correctCount + 1) / sampleSize) * 100

    // Set the item into local storage and ensure that it's stringified
    localStorage.setItem(newKey, JSON.stringify(newPercentage))
    setPercentage(newPercentage)
    // console.log(percentage)
  }

  // Handle clearing data
  const handleClearData = () => {
    localStorage.clear();
    setPercentage(0); // Reset localData state after clearing
    setCorrectCount(0)
  };

  const fetchDecks = () => {
    fetch("/api/decks")
      .then((res) => res.json())
      .then((decks) => {
        setDecks(decks);
      })
      .catch((error) => console.error("Error fetching:", error));
  };

  useEffect(() => {
    fetchDecks();
  }, []);
  console.log(decks);

  const handleContentChange = (content) => {
    // Content based on the button click
    setCurrentContent(content);
  };

  return (
    <>
    <>
      <header>
        <Navigation onContentChange={handleContentChange} />
      </header>

      <div className="content-container">
        <div className="galvanize-vocab-graphic">
          <img src="Galvanize_logo.svg" />
          <img src="Vocab_logo.svg" />
        </div>

   
        {currentContent === "about" && <About />}
        {currentContent === "home" && <Home />}
        {currentContent === "decks" && (
          <Decks decks={decks} fetchDecks={fetchDecks} />
        )}
      </div>
    <div>
      <button onClick={handleSetData}>Correct Answer</button>
      <button onClick={handleClearData}>Clear Data</button>
      <p>{roundedPercentage}</p>
    </div>
    </>
      <footer></footer>
    </>
  );
};

export default App;
