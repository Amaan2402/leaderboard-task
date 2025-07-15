import axios from "axios";

export const getClaimHistory = async (page = 1) => {
  const response = await axios.get(
    `https://api.leaderboard-task-v1.amaan24.tech/history?page=${page}`
  );
  return response.data;
};
