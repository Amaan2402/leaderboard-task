import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { getLeaderBoard } from "../../helperfunctions/user";
import LeaderBoardUserCard from "./LeaderBoardUserCard";
import { io, type Socket } from "socket.io-client";

function LeaderBoard() {
  const [leaderBoard, setLeaderBoard] = useState<
    | {
        _id: string;
        name: string;
        rank: number;
        totalPoints: number;
      }[]
    | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const socket = useRef<Socket | null>(null);

  const socketURL = "ws://localhost:5000";

  const fetchLeaderBoard = async () => {
    try {
      const data = await getLeaderBoard();
      console.log("Leaderboard data:", data.users);
      setLeaderBoard(data.users);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setError("Failed to load leaderboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderBoard();

    const socketInstance = io(socketURL, {
      reconnectionAttempts: 3,
      reconnectionDelay: 3000,
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.current = socketInstance;

    socket.current.on("pointsClaimed", (data) => {
      fetchLeaderBoard();
      console.log("Points claimed event received:", data);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="w-5/12 bg-[#191d20] border-[1px] border-[#222629] p-5">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-5/12 bg-[#191d20] border-[1px] border-[#222629] p-5">
        {error}
      </div>
    );
  }

  if (leaderBoard && leaderBoard.length === 0) {
    return (
      <div className="w-5/12 bg-[#191d20] border-[1px] border-[#222629] p-5">
        No leaderboard data available.
      </div>
    );
  }

  return (
    <div className="lg:w-5/12 border-[1px] border-[#181c1f] p-5 rounded-lg">
      <Header />
      <div>
        {leaderBoard &&
          leaderBoard.map((user) => (
            <LeaderBoardUserCard user={user} key={user._id} />
          ))}
      </div>
    </div>
  );
}

export default LeaderBoard;
