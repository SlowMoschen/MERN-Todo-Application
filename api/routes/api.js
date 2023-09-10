const express = require('express')
const route = express.Router()

const Todo = require('../models/todoSchema')

// GET - GET ROUTE
route.get('/', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).send(todos)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// POST - POST ROUTE
route.post('/add', async (req, res) => {
    try {
        const newTodo = await Todo.create(req.body)
        res.status(201).send(newTodo)
    } catch (error) {
        res.status(401).send({ message: 'Please do not leave the Document empty', errorMessage: error.message })
    }
})

// PACTH - PACTH ROUTE
route.patch('/edit/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send(updatedTodo)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// DELETE - DELETE ROUTE
route.delete('/delete/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndRemove(req.params.id, req.body)
        res.status(200).send(deletedTodo)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

module.exports = route