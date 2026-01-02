import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext, useReducer } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import NotificationContext from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const { notification, notificationDispatch } = useContext(NotificationContext)

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const { isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({
      type: 'VOTE',
      payload: `You voted '${anecdote.content}'`,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
    console.log('vote ', anecdote.id)
  }

  if (isError) {
    return <span> anecdote service not available due to: {error.message}</span>
  }

  const anecdotes = data || []

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notificationContent={notification} />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                handleVote(anecdote)
                notificationDispatch({
                  type: 'VOTE',
                  payload: `You voted '${anecdote.content}'`,
                })
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
