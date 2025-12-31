import { useDispatch, useSelector } from "react-redux";
import { voteAnecdoteById } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const Anecdotes = () => {
  // const anecdotes = useSelector((state) => state);
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return [...anecdotes].sort((a, b) => b.votes - a.votes);
    }
    return [...anecdotes]
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();

  const vote = ({ id, content }) => {
    dispatch(voteAnecdoteById(id));
    dispatch(showNotification(`You voted anecdote: ${content}`));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                vote({ id: anecdote.id, content: anecdote.content });
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Anecdotes;
