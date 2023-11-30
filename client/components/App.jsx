import React, { useEffect, useState } from "react";
import Navigation from "./Navigation/Navigation.jsx";
import Decks from "./Decks";
import Question from "./Question";

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

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleContentChange = (content) => {
    if (content === "decks") {
      fetchDecks();
    }
    setCurrentContent(content);
  };

  return (
    <>
      <header>
        <Navigation onContentChange={handleContentChange} />
      </header>
      <div id="main-content">
        <div className="content-container">
          {currentContent === "decks" && (
            <Decks decks={decks} setSelectedDeck={setSelectedDeck} />
          )}
          {currentContent === "question" && selectedDeck && (
            <Question flashcards={selectedDeck.flashcards} />
          )}
        </div>
      </div>
      <footer></footer>
    </>
  );
};

export default App;
