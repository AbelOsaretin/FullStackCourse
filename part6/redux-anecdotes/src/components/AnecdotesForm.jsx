import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdoteTextField.value;
    event.target.anecdoteTextField.value = "";
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
    dispatch(showNotification(`anecdote '${newAnecdote.content}' created`));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdoteTextField" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdotesForm;
