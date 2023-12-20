// hooks/useGetPeople.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople, selectPeople } from '../store/slices/peopleSlice';

const useGetPeople = () => {
  const dispatch = useDispatch();
  const { data: people, loading, error, totalPages, currentPage,currentQuery } =
    useSelector(selectPeople);
  const nextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchPeople({ page: currentPage + 1, query: currentPage.query }));
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchPeople({ page: currentPage - 1, query: currentPage.query }));
    }
  };


 useEffect(() => {
    // Fetch initial data when the component mounts
    dispatch(fetchPeople({ page: currentPage, query: currentQuery }));
  }, [dispatch, currentPage, currentQuery]);



  return { people, totalPages, currentPage, loading, error, nextPage, prevPage };
};

export default useGetPeople;
