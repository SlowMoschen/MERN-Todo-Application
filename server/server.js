require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 3001
const mongoUrl = process.env.MONGODB_URI || 'http://localhost:3001/MongoDBLink'

// Database Connection
mongoose.connect(mongoUrl, { 
    useNewUrlParser: true
})

const connection = mongoose.connection

connection.on('error', (error) => {
    console.log(error, 'Something occured while trying to connect to the Database');
})

connection.once('open', () => {
    console.log('Successfully connected to the Database');
})

// Middleware Dependencies
app.use(express.json())
app.use(cors())

// Server Setup
app.get('/', (req, res) => {
    res.send('API WORKING')
})

const APIRoute = require('./routes/routes')

app.use('/api', APIRoute)

app.listen(port, () => { console.log(`Server started successfully on Port: http://localhost:${port}`);})