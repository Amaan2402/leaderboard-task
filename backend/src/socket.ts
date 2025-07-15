import { Server } from "socket.io";

let io: Server;

export function initialiseSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://leaderboard-task-v1.amaan24.tech",
      ],
      credentials: true,
    },
  });

  if (io) {
    io.on("connection", (socket) => {
      console.log("A user connected 🔗", socket.id);

      socket.emit("Welcome to the Leaderboard API Socket!");

      socket.on("disconnect", () => {
        console.log("A user disconnected ❌", socket.id);
      });
    });
  }
}

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
