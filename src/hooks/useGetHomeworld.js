import { useState, useEffect } from "react";

const useHomeworld = (homeworldUrl) => {
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeworld = async () => {
      try {
        const response = await fetch(homeworldUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch homeworld details");
        }

        const homeworldData = await response.json();
        setHomeworld(homeworldData);
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
