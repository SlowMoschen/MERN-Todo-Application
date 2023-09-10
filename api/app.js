require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

// Database Connection
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
})

const connection = mongoose.connection

connection.on('error', error => {
    console.log(error, 'An Error occured while connecting to the DB');
})

connection.once('open', () => {
    connection.db.collection('mern_todo')
    console.log('Succesfully connected to DB');
})

// Middleware dependencies
// Middleware to enable JSON
app.use(express.json())

app.get('/', (req, res) => {
    res.json({"User": ["TODO1", "TODO2", "TODO3"]})
})

const ApiRoute = require('./routes/api')
app.use('/api', ApiRoute)

app.listen(PORT, () => { console.log(`app started on http://localhost:${PORT}`) })