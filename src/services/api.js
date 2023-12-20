// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SWAPI_BASE_URL || 'https://swapi.dev/api',
});

export const getPeople = async (page = 1) => {
  try {
    const response = await api.get('/people/', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching people data');
  }
};
