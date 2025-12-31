import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Anecdotes from "./components/AnecdoteList";
import AnecdotesForm from "./components/AnecdotesForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

// import { setAnecdotes } from "./reducers/anecdoteReducer";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import anecdoteService from "./services/anecdotes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

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
