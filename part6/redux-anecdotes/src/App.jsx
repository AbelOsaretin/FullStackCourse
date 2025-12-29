import { useSelector, useDispatch } from "react-redux";
import Anecdotes from "./components/AnecdoteList";
import AnecdotesForm from "./components/AnecdotesForm";
import Filter from "./components/Filter";

const App = () => {
  return (
    <div>
      <Filter />
      <Anecdotes />

      <AnecdotesForm />
    </div>
  );
};

export default App;
