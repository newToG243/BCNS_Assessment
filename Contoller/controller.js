
const Task = require('../Model/model')

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json({ data: task, msg: "Task created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID })
        if (!task) {
            return res.status(404).json({ msg: `no task with id:${taskID}}` })
        }
        res.status(200).json({ data: task, msg: "Task deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const existingTask = await Task.findById(taskID);

        if (!existingTask) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }

        if (existingTask.Completed) {
            // If the task is already completed,we can not mark it false;
            req.body.Completed = true;
        }
        
        const task = await Task.findByIdAndUpdate(taskID, req.body, { new: true, runValidators: true });

        res.status(200).json({ data: task, msg: "Task updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// const getAllTask = async (req, res) => {
//     try {
//         const { Title, Category, Sort } = req.query;
//         const queryObj = {}
//         if (Title) {
//             queryObj.Title = Title;
//         }
//         if (Category) {
//             queryObj.Category = Category;
//         }
//         let result = await Task.find(queryObj)
//         if (Sort) {
//             const sortList = await Sort.split(',').join(' ');
//             result =await result.sort(sortList);
//         } else {
//             result = result.sort((a, b) => a.Category - b.Category);
//         }

//         res.status(200).json({ data: result, totalResult: result.length })
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// }
const getAllTask = async (req, res) => {
    try {
        const { Title, Category, sort } = req.query;
        const queryObj = {};

        if (Title) {
            queryObj.Title = Title;
        }
        if (Category) {
            queryObj.Category = Category;
        }
        let result = Task.find(queryObj)
        if (sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        }
        let task = await result;

        res.status(200).json({ task,totalResults:task.length});
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    getAllTask, createTask, deleteTask, updateTask
}