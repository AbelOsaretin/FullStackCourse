import Note from "./components/Note";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/Toggleable";
import { useState, useEffect, useRef } from 'react'
import noteService from "./services/notes";
import Footer from "./components/Footer";
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()
  // const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  
 const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials', exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

//  const loginForm = () => {
//     const hideWhenVisible = { display: loginVisible ? 'none' : '' }
//     const showWhenVisible = { display: loginVisible ? '' : 'none' }

//     return (
//       <div>
//         <div style={hideWhenVisible}>
//           <button onClick={() => setLoginVisible(true)}>log in</button>
//         </div>
//         <div style={showWhenVisible}>
//           <LoginForm
//             username={username}
//             password={password}
//             handleUsernameChange={({ target }) => setUsername(target.value)}
//             handlePasswordChange={({ target }) => setPassword(target.value)}
//             handleSubmit={handleLogin}
//           />
//           <button onClick={() => setLoginVisible(false)}>cancel</button>
//         </div>
//       </div>
//     )
//   }

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

 
  // console.log("render", notes.length, "notes");

 const addNote = (noteObject) => {
   noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }



  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((updatedImportance) => {
        setNotes(notes.map((n) => (n.id === id ? updatedImportance : n)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        console.log(error);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable> 

        { user?
      <div>
        <p>{user.name} logged-in</p>
          {noteForm()}
      </div>:
      <div></div>
}
      

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {" "}
          Show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
