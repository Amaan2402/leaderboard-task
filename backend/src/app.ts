import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./routes/user";
import { historyRoutes } from "./routes/history";
import { ErrorType } from "./types/types";
import { createServer } from "http";
import { initialiseSocket } from "./socket";

const app = express();
const server = createServer(app);
initialiseSocket(server);

app.use(
  cors({
    origin: ["https://leaderboard-task.amaan24.tech", "http://localhost:5173"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Leaderboard API");
});

app.use("/api/user", userRoutes);
app.use("/api/history", historyRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err: ErrorType, req: Request, res: Response, next: NextFunction) => {
  console.error("::::ERROR::::");
  console.error(err);
  res
    .status(err.statusCode || 500)
    .json({ error: err.message || "Internal Server Error" });
});

export default server;
