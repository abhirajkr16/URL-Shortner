import app from "./app.js";
import pool from "./database/connection.js";
import redisClient from "./config/redis.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const connection = await pool.getConnection();

    console.log(" Connected to MySQL");

    await redisClient.connect();
    console.log("Connected to Redis");

    connection.release();

    app.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Database Connection Failed");
    console.error(error.message);
  }
}

startServer();
