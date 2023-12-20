// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SWAPI_BASE_URL,
});

export const getPeople = async (page = 1, searchQuery) => {
  try {
    const params = { page, search: searchQuery }; // Include searchQuery in params
    const response = await api.get("/people/", { params });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching people data");
  }
};
