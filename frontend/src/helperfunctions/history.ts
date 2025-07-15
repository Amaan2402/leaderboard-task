import axios from "axios";

export const getClaimHistory = async (page = 1) => {
  const response = await axios.get(
    `http://localhost:5000/api/history?page=${page}`
  );
  return response.data;
};
