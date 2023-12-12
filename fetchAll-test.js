import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10000,
  duration: "30s",
};

export default function () {
  const url = "http://localhost:5173/api/decks";

  const response = http.get(url);

  check(response, {
    "Status is 200": (r) => r.status === 200,
  });

  console.log(`Response time for ${url}: ${response.timings.duration} ms`);
}
