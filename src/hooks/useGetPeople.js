// hooks/useGetPeople.js
import { useState, useEffect } from 'react';
import { getPeople } from '../services/api';

const useGetPeople = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPeople();
        setPeople(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { people, loading, error };
};

export default useGetPeople;
