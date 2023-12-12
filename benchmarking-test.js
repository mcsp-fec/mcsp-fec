import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 2000,
  duration: "30s",
};

export default function () {
  http.get("http://localhost:5173/api/decks");
  sleep(1);
}
