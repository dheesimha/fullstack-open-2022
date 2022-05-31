const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.MONGO_URI

mongoose.connect(URI).then(console.log('Connected to the DB'))

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (v) {
                return /\d{2,3}-\d{8}/.test(v)
            }
        }

    }
})



contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})
module.exports = mongoose.model('Person', contactSchema)

