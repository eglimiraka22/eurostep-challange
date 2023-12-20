// hooks/useGetPeople.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople, selectPeople } from '../store/slices/peopleSlice';

const useGetPeople = () => {
  const dispatch = useDispatch();
  const { data: people, loading, error, totalPages, currentPage,currentQuery,totalCount } =
    useSelector(selectPeople);

    const { speciesFilter, homeworldFilter, filmFilter } = useSelector((state) => state.filters);

  const nextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchPeople({ page: currentPage + 1, query:currentQuery,speciesFilter, filmFilter,homeworldFilter  }));
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchPeople({ page: currentPage - 1, query:currentQuery,speciesFilter, filmFilter,homeworldFilter  }));
    }
  };

 useEffect(() => {
    // Fetch initial data when the component mounts
    dispatch(fetchPeople({ page: 1}));
  }, [dispatch]);



  return { people, totalPages, currentPage, loading, error, nextPage, prevPage };
};

export default useGetPeople;
