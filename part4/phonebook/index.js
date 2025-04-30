require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Phonebook = require('./models/phonebook')

const app = express()

app.use(express.static('dist'))

app.use(express.json())

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${Phonebook.length} people</p><p>${Date()}</p>`
  )
})

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then((persons) => {
    console.log(persons)
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  console.log('Get Single Person')
  const id = request.params.id
  Phonebook.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    }).catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })

    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Phonebook.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Phonebook.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.phoneNumber = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const person = new Phonebook({
    name: body.name,
    phoneNumber: body.number,
  })

  person
    .save()
    .then((savePerson) => {
      console.log(savePerson)
      response.json(savePerson)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
