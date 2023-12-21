import { useState, useEffect } from "react";
import axios from "axios";

const useHomeworld = (homeworldUrl) => {
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeworld = async () => {
      try {
        const response = await axios.get(homeworldUrl);
        setHomeworld(response.data);
      } catch (error) {
        console.error("Error fetching homeworld details:", error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (homeworldUrl) {
      fetchHomeworld();
    }

    return () => {
      // Cleanup, for example, cancel any ongoing fetch request
    };
  }, [homeworldUrl]);

  return { homeworld, loading, error };
};

export default useHomeworld;
