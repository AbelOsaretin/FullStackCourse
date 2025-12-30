import { useSelector, useDispatch } from "react-redux";
import Anecdotes from "./components/AnecdoteList";
import AnecdotesForm from "./components/AnecdotesForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <Notification />
      <Filter />
      <Anecdotes />

      <AnecdotesForm />
    </div>
  );
};

export default App;
