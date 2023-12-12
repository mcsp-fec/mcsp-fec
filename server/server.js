//BASELINE CODE
//
//
// import express from "express";
// import pg from "pg";
// import dotenv from "dotenv";

// dotenv.config({ path: "../.env" });

// const PORT = process.env.PORT;
// const DATABASE_URL = process.env.DATABASE_URL;
// const client = new pg.Client({
//   connectionString: DATABASE_URL,
// });
// // const sql = postgres(process.env.DATABASE_URL);
// await client.connect();
// const app = express();

// app.get("/api/decks", (req, res) => {
//   client
//     .query("SELECT * FROM decks")
//     .then((rows) => {
//       // const rows = result.rows;
//       res.send(rows.rows);
//     })
//     .catch((error) => {
//       console.error("Error executing query:", error);
//       res.status(500).send("Internal Server Error");
//     });
// });

// app.get("/api/deck/:id", (req, res) => {
//   const deckId = Number.parseInt(req.params.id);
//   client
//     .query(`Select * From flashcard WHERE flashcard.deck_id = $1`, [deckId])
//     .then((data) => {
//       if (data.rows.length == 0) {
//         res.sendStatus(404);
//         return;
//       }
//       res.json(data.rows);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// });

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });
//
//
//
//
//
//
//
//
//BASELINE WITH REDIS CACHING CODE
import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const REDIS_PORT = process.env.REDIS_PORT;

// For PostgreSQL
const pgClient = new pg.Client({
  connectionString: DATABASE_URL,
});

pgClient.on("error", (err) => console.log("PostgreSQL Client Error", err));

await pgClient.connect();

// For Redis
const redisClient = createClient({
  connectionString: DATABASE_URL,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();

const redisSetAsync = redisClient.set.bind(redisClient);
const redisGetAsync = redisClient.get.bind(redisClient);
const redisExpireAsync = redisClient.expire.bind(redisClient);

const app = express();

const cacheMiddleware = (duration) => {
  return async (req, res, next) => {
    const key = "_express_" + (req.originalUrl || req.url);

    try {
      const cachedBody = await redisGetAsync(key);

      if (cachedBody) {
        res.send(JSON.parse(cachedBody));
      } else {
        res.sendResponse = res.send;
        res.send = async (body) => {
          await redisSetAsync(key, JSON.stringify(body));
          await redisExpireAsync(key, duration);
          res.sendResponse(body);
        };
        next();
      }
    } catch (error) {
      console.error("Redis error:", error);
      next();
    }
  };
};

// For PostgreSQL queries
app.get("/api/decks", cacheMiddleware(60), async (req, res) => {
  try {
    const result = await pgClient.query("SELECT * FROM decks");
    res.send(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/deck/:id", cacheMiddleware(60), async (req, res) => {
  const deckId = Number.parseInt(req.params.id);
  try {
    const result = await pgClient.query(
      `SELECT * FROM flashcard WHERE flashcard.deck_id = $1`,
      [deckId]
    );

    if (result.rows.length === 0) {
      res.sendStatus(404);
      return;
    }

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
//
//
//
//
//
//
//BASELINE WITH REDIS CACHING AND ASYNC OPERATIONS CODE

// import express from "express";
// import pg from "pg";
// import dotenv from "dotenv";
// import { createClient } from "redis";

// dotenv.config({ path: "../.env" });

// const PORT = process.env.PORT;
// const DATABASE_URL = process.env.DATABASE_URL;
// const REDIS_PORT = process.env.REDIS_PORT;

// // For PostgreSQL
// const pool = new pg.Pool({
//   connectionString: DATABASE_URL,
// });

// pool.on("error", (err) => console.log("PostgreSQL Pool Error", err));

// const app = express();

// const cacheMiddleware = (duration) => {
//   return async (req, res, next) => {
//     const key = "_express_" + (req.originalUrl || req.url);

//     try {
//       const cachedBody = await redisGetAsync(key);

//       if (cachedBody) {
//         res.send(JSON.parse(cachedBody));
//       } else {
//         res.sendResponse = res.send;
//         res.send = async (body) => {
//           await redisSetAsync(key, JSON.stringify(body));
//           await redisExpireAsync(key, duration);
//           res.sendResponse(body);
//         };
//         next();
//       }
//     } catch (error) {
//       console.error("Redis error:", error);
//       next();
//     }
//   };
// };

// // For PostgreSQL queries
// app.get("/api/decks", cacheMiddleware(60), async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM decks");
//     res.send(result.rows);
//   } catch (error) {
//     console.error("Error executing query:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.get("/api/deck/:id", cacheMiddleware(60), async (req, res) => {
//   const deckId = Number.parseInt(req.params.id);
//   try {
//     const result = await pool.query(
//       `SELECT * FROM flashcard WHERE flashcard.deck_id = $1`,
//       [deckId]
//     );

//     if (result.rows.length === 0) {
//       res.sendStatus(404);
//       return;
//     }

//     res.json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });
