const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: [true, 'Please enter title']
    },
    Data: {
        type: String,
        required: [true, 'Empty task can not be created']
    },
    Completed: { type: Boolean, default: false },
    Duedate: {
        type: Date
    },
    Category:{
        type:String,
        default:"General"
    }

})

module.exports = mongoose.model('Task', TaskSchema);