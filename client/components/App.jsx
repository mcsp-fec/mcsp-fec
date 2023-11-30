import React, { useEffect, useState } from "react";

import Navigation from "./Navigation/Navigation.jsx";
import About from "./About";
import Home from "./Home/Home.jsx";
import Decks from "./Decks";

import "../app.css";

const App = () => {
  const [decks, setDecks] = useState([]);
  const [currentContent, setCurrentContent] = useState("home");
  const [selectedDeck, setSelectedDeck] = useState(null);

  const fetchDecks = () => {
    fetch("/api/decks")
      .then((res) => res.json())
      .then((decks) => {
        setDecks(decks);
      })
      .catch((error) => console.error("Error fetching decks:", error));
  };

  console.log("decks from app", decks);

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleContentChange = (content) => {
    if (content === "decks") {
      fetchDecks();
    }
    setCurrentContent(content);
  };

  const mainContent = () => {
    switch (currentContent) {
      case "about":
        return <About />;
      case "home":
        return <Home />;
      case "decks":
        return <Deck decks={decks} fetchDecks={fetchDecks} />;
      case "question":
        return <Question />;
      case "answer":
        return (
          <div className="answer-box">
            <Answer />
            <button className="answer-button-right">YOUR_TEXT_HERE</button>
          </div>
        );
      default:
        return <Home />;
    }
  };

  return (
    <>
      <header>
        <Navigation onContentChange={handleContentChange} />
      </header>
      <div id="main-content">
        <div className="content-container">
          <div className="galvanize-vocab-graphic">
            <img src="galvanize-logo.svg" />
            <img src="vocab-logo.svg" />
          </div>
          {mainContent()}
        </div>
      </div>
      <footer></footer>
    </>
  );
};

export default App;
