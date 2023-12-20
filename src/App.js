import useGetPeople from "./hooks/useGetPeople";

function App() {

  const { people, loading, error } = useGetPeople();

  return (
    <div className="main-container">
     
    </div>
  );
}

export default App;
