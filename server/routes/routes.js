const express = require('express')
const router = express.Router()

const Todo = require('../models/TodoSchema')

// GET - Request to show all Todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).send(todos)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// GET - Request to get one specific Todo
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        res.status(200).send(todo)
    } catch (error) {
        res.status(404).send({ message: 'Could not find Todo', ErrorMessage: error.message})
    }
})

// POST - Request to add a new Todo
router.post('/', async (req, res) => {
    try {
        const newTodo = await Todo.create(req.body)
        res.status(201).send(newTodo)
    } catch (error) {
        res.status(401).send({ message: 'Please do not send empty Form', ErrorMessage: error.message })
    }
})
// PATCH - Request to edit an existing Todo
router.patch('/:id', async (req, res) => {
    try {
        const editedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send(editedTodo)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})
// DELETE - Request to delete an existing Todo
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndRemove(req.params.id, req.body)
        res.status(200).send(deletedTodo)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

module.exports = router