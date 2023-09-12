const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = new mongoose.model("Todo", TodoSchema)