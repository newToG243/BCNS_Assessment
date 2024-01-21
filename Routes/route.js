const express = require('express');
const router = express.Router();

const { getAllTask, createTask, deleteTask, updateTask } = require('../Contoller/controller')

router.route('/').get(getAllTask).post(createTask);
router.route('/deleteTask/:id').delete(deleteTask);
router.route('/updateTask/:id').patch(updateTask);
module.exports = router;