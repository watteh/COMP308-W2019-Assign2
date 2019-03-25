// contact.js -- Ryan Watson -- 300920674 -- 03/25/19

let mongoose = require('mongoose');

//create a model class
let contactSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number
}, {
    collection: "first"
});

module.exports = mongoose.model('contact', contactSchema);