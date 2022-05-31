const mongoose = require("mongoose")
require('dotenv').config()

if (process.argv.length < 3) {
    console.log('Enter a valid password');
    process.exit(1)
}

const password = process.argv[2]

const url = process.env.MONGO_URI

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String
})

const Person = new mongoose.model('Person', contactSchema)

if (process.argv.length == 5) {
    const person = new Person(
        {
            name: process.argv[3],
            phoneNumber: process.argv[4]

        }
    )

    person.save().then(result => {
        console.log(`Added ${result.name} number ${result.phoneNumber} to the phonebook`);
        mongoose.connection.close()
    })
}

else {

    console.log('Phonebook')
    Person.find({}).then(
        (result) => {
            result.forEach((person) => {
                console.log(`${person.name}     ${person.phoneNumber}`);
            }
            )
            mongoose.connection.close()
        }
    )

}
