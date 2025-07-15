import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import server from "./app";

configDotenv();

const PORT = process.env.PORT || 3000;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB ✅");
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT} 🚀`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
