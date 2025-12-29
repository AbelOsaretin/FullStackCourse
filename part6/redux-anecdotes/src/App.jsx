import { useSelector, useDispatch } from "react-redux";
import Anecdotes from "./components/AnecdoteList";
import AnecdotesForm from "./components/AnecdotesForm";

const App = () => {
  return (
    <div>
      <Anecdotes />

      <AnecdotesForm />
    </div>
  );
};

export default App;
