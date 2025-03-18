const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>to access data, type localhost:3001/api/persons</h1>');
});

app.get('/api/persons', (request, response) => {
    response.json(persons)
});

app.get('/info/', (request, response) => {
    const total = persons.length;
    response.send(`The phonebook has info for ${total} people <br> <br> ${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = (request.params.id)
    const person = persons.find(person => person.id === id)
    person
     ? response.json(person)
     : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = (request.params.id)
    const person = persons.find(person => person.id === id)
    const index = persons.indexOf(person)
    index
        ? persons.splice(index, 1)
        :response.status(404).end()
    response.send(console.log(`Deleted ${person.name}`))
})

const generateId = () => {
    const randomNumber = Math.floor(Math.random() * (100000000 - 2 + 1)) + 2;
    return randomNumber;
}
app.post('/api/persons', (request, response) => {
    morgan.token('type', function (req, res) { return req.headers['content-type'] })
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person);
    response.json(person);

})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})