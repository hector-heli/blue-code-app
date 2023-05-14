/* eslint-disable no-undef */
/* eslint-disable no-console */
import mongoose from 'mongoose';

const URI = "mongodb+srv://hectorheli:student@cluster0.ge8haal.mongodb.net/emergency-calls-db?retryWrites=true&w=majority";

mongoose.connect(URI)
  .then(() => {
    console.log(`db ${mongoose.connection.name} is connected`)
  })
  .catch((err) => {
    console.warn("Cannot connect to MongoDB")
    console.error(err)
  })

  export default mongoose
  