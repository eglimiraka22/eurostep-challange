// services/filterApis.js
import axios from "axios";

const SWAPI_BASE_URL = process.env.REACT_APP_SWAPI_BASE_URL;

export const getSpeciesOptions = async () => {
  try {
    const response = await axios.get(`${SWAPI_BASE_URL}/species/`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching species options");
  }
};

export const getHomeworldOptions = async () => {
  try {
    const response = await axios.get(`${SWAPI_BASE_URL}/planets/`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching homeworld options");
  }
};

export const getFilmOptions = async () => {
  try {
    const response = await axios.get(`${SWAPI_BASE_URL}/films/`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching film options");
  }
};
