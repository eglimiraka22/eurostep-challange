// hooks/useGetPeople.js
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople, selectPeople } from '../store/slices/peopleSlice';

const useGetPeople = (initialPage = 1) => {
  const dispatch = useDispatch();
  const { data: people, loading, error, totalPages, currentPage } =
    useSelector(selectPeople);

  const nextPage = () => {
      dispatch(fetchPeople(currentPage + 1));
  };

  const prevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchPeople(currentPage - 1));
    }
  };
  console.log(currentPage)

  return { people, totalPages, currentPage, loading, error, nextPage, prevPage };
};

export default useGetPeople;
