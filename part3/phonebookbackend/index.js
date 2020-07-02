const express = require('express')
const app = express()
require('dotenv').config()
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

morgan.token('person', req => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    } else {
        return ' '
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

const generateId = () => {
    const maxId = Person.find({}).length > 0
        ? Math.floor(Math.random() * 1000) + 1
        : 0
    return maxId + 1
}

/*let persons = [
        {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
        },
        {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
        },
        {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
        },
        {
            "name": "Mary Poppendieck",
            "number": "39-23-6423123",
            "id": 4
        }
];*/

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            res.json(person)
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    let time = new Date()
    Person
        .estimatedDocumentCount()
        .then(count => {
            res.send(`<p>Phonebook has info for ${count} people</p><p>${time}</p>`)
        })
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    /*const notUnique = persons.filter(person => person.name === body.name);
        if (!body.name && !body.number) {
            return res.status(400).json({
                error: 'Name and number are missing'
            })
        } else if (!body.name) {
            return res.status(400).json({
                error: 'Name is missing'
            })
        } else if (!body.number) {
            return res.status(400).json({
                error: 'Number is missing'
            });
        }
        if (notUnique.length > 0) {
        return res.status(400).json({
            error: 'Name must be unique'
        })
    }*/

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId()
    })

    person
        .save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const note = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(req.params.id, note, { new: true })
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    // else if (error.name === 'ValidationError') {
    //     return res.status(400).json({ error: error.message })
    // }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
