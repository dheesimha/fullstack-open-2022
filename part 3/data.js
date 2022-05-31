const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
require('dotenv').config()
const Person = require('./models/people')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))


morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :response-time ms :body'))


const errorHandler = (err, req, res, next) => {
    console.error(err.message)



    if (err.name === 'CastError')
        return res.status(400).send({ error: 'malformatted id' })
    else
        if (err.name === 'ValidationError')
            return res.status(400).send({ error: err.message })



    next(err)
}


app.use(errorHandler)

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


let notesCount = 0




const unknownEndpoint = (req, res, next) => {
    res.status(404).send({ error: 'unknown object' })
}

// app.use(unknownEndpoint)

let genId = () => {
    return Math.floor(Math.random() * 100000000)
}




app.get("/", (req, res) => {
    res.send('hey')
})


app.get("/api/persons", (req, res) => {
    Person.find({}).then((person) => {
        res.json(person)
    })

})


app.delete('/api/persons/:id', (req, res) => {
    let id = req.params.id

    Person.findByIdAndDelete(id).then((result) => { res.json(result) })


})

app.post('/api/persons', (req, res, next) => {

    let id = req.params.id

    let body = req.body

    if (body.name === undefined || body.phoneNumber === undefined) {
        return res.status(400).json({ error: 'Missing name/phone number' })
    }


    let person = new Person(
        {
            name: body.name,
            phoneNumber: body.phoneNumber

        }
    )

    person.save().then((ans) => { res.json(ans) }).catch(err => { next(err) })



})


app.get('/info', (req, res) => {
    Person.countDocuments({}, (err, count) => {
        if (err) {
            res.json({ error: err })
        }

        else {
            notesCount = count


        }
    })
    let date = new Date()
    res.send(`<p>Phonebook has info  of ${notesCount} people</p> <br> ${date}`)

})

app.get('/api/persons/:id', (req, res, next) => {



    Person.findById(req.params.id).then((note) => {
        if (note) {
            res.json({
                name: note.name,
                phoneNumber: note.phoneNumber,
                id: note.id
            })
        }

        else {
            res.status(404).end()

        }
    }).catch((err) => {
        next(err)
    })

})

app.put('/api/persons/:id', (req, res) => {
    let id = req.params.id
    let body = req.body

    Person.findByIdAndUpdate(id, { phoneNumber: req.body.phoneNumber }, { new: true, runValidators: true }).then(result => res.json(result))
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port`);

})
