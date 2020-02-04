const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 1
    },
    {
        name: "Alan Turing",
        number: "0400-121999",
        id: 2
    },
    {
        name: "Delete Me",
        number: "123-1234123",
        id: 5
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    const amount = persons.length
    const time = new Date()
    res.send(
        `<p>Phonebook has info for ${amount} people</p>
        <p>${time}</p>
        `
    )
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'information missing'
        })
    }

    if (persons.filter(p => p.name === body.name).length > 0) {
        return res.status(400).json({
            error: 'contact exists already'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.round(Math.random() * 10000)
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})