const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI
const name = process.argv[3]
const phoneNumber = process.argv[4]

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    number: {
        type: String,
        required: true,
        unique: true,
        minlength: 8
    }
})
personSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: phoneNumber,
    id: Math.floor(Math.random() * 1000) + 1
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

/*if (process.argv.length < 4) {
    Person
        .find({})
        .then(person => {
            console.log('phonebook:');
            person.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            });
            mongoose.connection.close()
        })
    } else {
        person.save().then(() => {
            console.log(`added ${person.name} number ${person.number} to phonebook`);
            mongoose.connection.close()
        });
}*/

module.exports = mongoose.model('Person', personSchema)
