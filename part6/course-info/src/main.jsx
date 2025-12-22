// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.jsx'
// // import { createStore } from 'redux'

// // const counterReducer = (state = 0, action) => {
// //   switch (action.type) {
// //     case 'INCREMENT':
// //       return state + 1
// //     case 'DECREMENT':
// //       return state - 1
// //     case 'ZERO':
// //       return 0
// //     default: // if none of the above matches, code comes here
// //       return state
// //   }
// // }

// // const store = createStore(counterReducer)

// // store.subscribe(() => {
// //   const storeNow = store.getState()
// //   console.log(storeNow)
// // })

// // // console.log(store.getState())
// // store.dispatch({type: 'INCREMENT'})
// // store.dispatch({type: 'INCREMENT'})
// // store.dispatch({type: 'INCREMENT'})
// // // console.log(store.getState())
// // store.dispatch({type: 'ZERO'})
// // store.dispatch({type: 'DECREMENT'})
// // // console.log(store.getState())

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>,
// // )


// import ReactDOM from 'react-dom/client'
// import { createStore } from 'redux'

// const counterReducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     case 'ZERO':
//       return 0
//     default:
//       return state
//   }
// }

// const store = createStore(counterReducer)

// const App = () => {
//   return (
//     <div>
//       <div>{store.getState()}</div>
//       <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>
//         plus
//       </button>
//       <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>
//         minus
//       </button>
//       <button onClick={() => store.dispatch({ type: 'ZERO' })}>
//         zero
//       </button>
//     </div>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'))

// const renderApp = () => {
//   root.render(<App />)
// }

// renderApp()
// store.subscribe(renderApp)


import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import noteReducer from './reducers/noteReducer.js'

// const noteReducer = (state = [], action) => {
//   switch (action.type) {
//     case 'NEW_NOTE':
//  return state.concat(action.payload)
//     default:
//       return state
//   }
// }

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }    
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  payload: {
    id: 2
  }
}
)

const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map(note => (
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)