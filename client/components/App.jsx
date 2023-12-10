import React, { useEffect, useState } from "react";
import Navigation from "./Navigation/Navigation.jsx";
import MainContent from "./MainContent/MainContent.jsx";
import "../app.css";

const App = () => {
  const [decks, setDecks] = useState([]);
  const [cardArr, setCardArr] = useState([]);
  const [currentView, setCurrentView] = useState("home");
  const [deckPercentages, setDeckPercentages] = useState({});

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleView = (view) => {
    setCurrentView(view);
  };

  const initializeDeckPercentages = (decks) => {
    const initialDeckValues = {};
    decks.forEach((deck) => {
      const localStorageKey = `deck${deck.id}`;
      let existingData = localStorage.getItem(localStorageKey);
      if (existingData === null) {
        localStorage.setItem(localStorageKey, 0);
        existingData = 0;
      }
      initialDeckValues[deck.id] = parseInt(existingData);
    });
    setDeckPercentages(initialDeckValues);
  };

  const fetchDecks = () => {
    fetch("/api/decks")
      .then((res) => res.json())
      .then((decks) => {
        setDecks(decks);
        initializeDeckPercentages(decks);
      })
      .catch((error) => console.error("Error fetching decks:", error));
  };

  const handleCorrectAnswer = (deckID, totalQuestions, currentQuestion) => {
    const localStorageKey = `deck${deckID}`;
    const localStorageValue = Number(localStorage.getItem(localStorageKey)) || 0;
    let numberCorrect = (localStorageValue / 100) * totalQuestions;
    numberCorrect++;

    let currentPercent = Math.floor((numberCorrect / totalQuestions) * 100);
    if (currentQuestion === totalQuestions && currentPercent > 99) {
      currentPercent = 100;
    }

    localStorage.setItem(localStorageKey, currentPercent);
    updateDeckPercentage(deckID, currentPercent);
  };

  const handleWrongAnswer = (deckID) => {
    updateDeckPercentage(deckID, 0);
  };

  const handleDeckClick = (deckID) => {
    fetch(`/api/deck/${deckID}`)
      .then((res) => res.json())
      .then((data) => {
        setCardArr(data);
        setCurrentView("card");
      })
      .catch((error) => console.error("Error fetching deck:", error));
  };

  const updateDeckPercentage = (deckID, count) => {
    setDeckPercentages((prevPercentages) => ({
      ...prevPercentages,
      [deckID]: count,
    }));
  };

  return (
    <>
      <header>
        <Navigation handleView={handleView} />
      </header>
      <div id="main-content">
        <div className="content-container">
          <div className="galvanize-vocab-graphic">
            <img className="galvanize-logo" src="galvanize-logo.svg" alt="galvanize logo" />
            <img className="vocab-logo" src="vocab-logo.svg" alt="vocab logo"/>
          </div>
          <MainContent
            currentView={currentView}
            decks={decks}
            handleView={handleView}
            handleDeckClick={handleDeckClick}
            cardArr={cardArr}
            deckPercentages={deckPercentages}
            handleCorrectAnswer={handleCorrectAnswer}
            handleWrongAnswer={handleWrongAnswer}
          />
        </div>
      </div>
      <footer></footer>
    </>
  );
};

export default App;