import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
};

const baseUrl = "http://localhost:5173"; // Replace with your actual API endpoint

export default function () {
  // Scenario 1: Fetch all flashcards
  const fetchDecks = http.get(`${baseUrl}/api/decks`);

  check(fetchDecks, {
    "Fetch Deck Status is 200": (r) => r.status === 200,
    "Fetch Deck Response Time is within threshold": (r) =>
      r.timings.duration < 200, // Adjust the threshold as needed
  });

  // You can add more scenarios for other API endpoints or operations

  sleep(5);
}
