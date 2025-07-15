import axios from "axios";

export const getUsers = async (page = 1) => {
  const response = await axios.get(
    `http://localhost:5000/api/user?page=${page}`
  );
  return response.data;
};

export const getLeaderBoard = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/user/leaderboard"
  );
  return response.data;
};

export const addUser = async (name: string) => {
  const response = await axios.post("http://localhost:5000/api/user", {
    name: name,
  });

  return response;
};

export const claimPoints = async (userId: string) => {
  const response = await axios.post(
    `http://localhost:5000/api/user/claim/${userId}`
  );
  return response.data;
};
