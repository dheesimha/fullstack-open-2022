const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")

app.use(express.json())
app.use(cors())


morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :response-time ms :body'))
let notes =
    [
        {
            "id": 1,
            "name": "Arto Hellas",
            "number": "040-123456"
        },
        {
            "id": 2,
            "name": "Ada Lovelace",
            "number": "39-44-5323523"
        },
        {
            "id": 3,
            "name": "Dan Abramov",
            "number": "12-43-234345"
        },
        {
            "id": 4,
            "name": "Mary Poppendieck",
            "number": "39-23-6423122"
        }
    ]


let notesCount




const unknownEndpoint = (req, res, next) => {
    res.status(404).send({ error: 'unknown object' })
}

// app.use(unknownEndpoint)

let genId = () => {
    return Math.floor(Math.random() * 100000000)
}


const port = 3001 || process.env.PORT
app.get("/api/persons", (req, res) => {
    res.send(notes)


})


app.get('/api/persons/:id', (req, res) => {
    let id = Number(req.params.id)

    let person = notes.filter(note => note.id === id)

    if (person.length > 0) {
        res.send(person)
    }

    else {
        res.sendStatus(404)
    }
})


app.delete('/api/personbs/:id', (req, res) => {
    let id = Number(req.params.id)

    let person = notes.filter(note => note.id !== id)
    notes = person

    res.status(200).send(notes)
})

app.post('/api/persons', (req, res) => {

    let body = req.body

    if (body.name === "" || body.number === "") {
        res.statusMessage = 'Missing entries body/number'
        res.status(422).end()
    }

    else
        if (notes.find((note) => note.name === body.name)) {
            res.statusMessage = "Duplicate entry"
            res.status(422).end()
        }

        else {

            body.id = genId()

            notes = notes.concat(body)

            res.send('Posted successfully')
        }


})


app.get('/info', (req, res) => {
    notesCount = notes.length
    let date = new Date()
    res.send(`<p>Phonebook has info  of ${notesCount} people</p> <br> ${date}`)

})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
