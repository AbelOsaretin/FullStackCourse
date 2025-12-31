import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdoteTextField.value;
    event.target.anecdoteTextField.value = "";
    dispatch(createNewAnecdote(content));
    dispatch(showNotification(`anecdote '${content}' created`));
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
