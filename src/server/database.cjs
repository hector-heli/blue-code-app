/* eslint-disable no-undef */
/* eslint-disable no-console */
const mongoose = require('mongoose')

const URI = "mongodb+srv://hectorheli:student@cluster0.ge8haal.mongodb.net/emergency-calls-db?retryWrites=true&w=majority";

module.exports = mongoose.connect(URI)
  .then((res, db) => {
    console.log(`db ${db} is connected`)
  })
  .catch((err) => {
    console.warn("Cannot connect to Mongo")
    console.error(err)
  })