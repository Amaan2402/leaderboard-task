import axios from "axios";

export const getUsers = async (page = 1) => {
  const response = await axios.get(
    `https://api.leaderboard-task.amaan24.tech/user?page=${page}`
  );
  return response.data;
};

export const getLeaderBoard = async () => {
  const response = await axios.get(
    "https://api.leaderboard-task.amaan24.tech/user/leaderboard"
  );
  return response.data;
};

export const addUser = async (name: string) => {
  const response = await axios.post(
    "https://api.leaderboard-task.amaan24.tech/user",
    {
      name: name,
    }
  );

  return response;
};

export const claimPoints = async (userId: string) => {
  const response = await axios.post(
    `https://api.leaderboard-task.amaan24.tech/user/claim/${userId}`
  );
  return response.data;
};
