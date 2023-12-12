import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  // Load the initial page
  const homeResponse = http.get("http://localhost:5173/");
  sleep(5);

  // Click on the "decks-button"
  const decksButtonResponse = http.post(
    "http://localhost:5173/api/clickDecksButton",
    {
      // Add any necessary parameters or headers here
    }
  );
  sleep(5);

  // Measure API performance
  const apiResponse = http.get("http://localhost:5173/api/decks");

  console.log("Page Load Time:", homeResponse.timings.duration, "milliseconds");
  console.log(
    "Decks Button Click Time:",
    decksButtonResponse.timings.duration,
    "milliseconds"
  );
  console.log(
    "API Response Time:",
    apiResponse.timings.duration,
    "milliseconds"
  );
}
