import { faker } from "@faker-js/faker";
import pg from "pg";
import fs from "fs";

const client = new pg.Client({
  host: "localhost",
  database: "FEC",
  port: 3006,
});

const writableStream = fs.createWriteStream("data.csv");

await client.connect();

const result = await client.query(`SELECT * FROM flashcard;`);
console.log(result.rows);

for (let i = 0; i < 1000; i++) {
  const description = faker.lorem.words();
  const priority = faker.number.int({ min: 1, max: 3 });

  writableStream.write(`${description}, ${priority}\n`);
}

writableStream.close();
client.end();
