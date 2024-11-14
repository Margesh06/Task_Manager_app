const Task = require('../models/Task');

const createTask = async (req, res) => {
    const { name, description } = req.body;
    const task = new Task({ userId: req.user.userId, name, description });
    await task.save();
    res.status(201).json(task);
};

const getTasks = async (req, res) => {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTask);
};

const deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
