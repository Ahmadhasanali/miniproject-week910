const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const todos = express.Router()

const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { Todo } = require('../models');
todos.use(cors());

todos.get('/', authMiddleware, async (req, res) => {
    const { user } = res.locals
    const userId = user.dataValues.userId
    Todo.findAll({
        where: {
            userId: userId,
        },
        order: [
            ['priority', 'DESC'],
            ['status', 'DESC'],
        ]
    })
        .then(todos => {
            const data = todos
            res.json({ data })
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

todos.post('/', authMiddleware, async (req, res) => {
    const { user } = res.locals
    const userId = user.dataValues.userId
    const data = {
        userId,
        todo: req.body.todo,
        description: req.body.description,
        priority: req.body.priority,
        time: req.body.time,
        status: false,
    }
    Todo.create(data)
        .then(todo => {
            res.json({ message: `${todo.todo} has been created` })
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

todos.post('/update/:todoId', authMiddleware, async (req, res) => {
    const { user } = res.locals
    const userId = user.dataValues.userId
    const { todoId } = req.params
    const { todo, description, priority, time } = req.body
    const data = await Todo.findOne({
        where: {
            todoId
        }
    })

    console.log(data.dataValues);

    if (!data) {
        return res.status(400).json({ errorMessage: "Data not found" })
    }

    if (userId === data.dataValues.userId) {
        const update = await data.update({
            todo,
            description,
            priority,
            time
        })
        return res.json({
            update,
            result: 'success',
            success: true
        })
    } else {
        return res.status(403).json({ message: 'Forbidden' })
    }
})

todos.post('/check/:todoId', authMiddleware, async(req, res)=>{
    const { user } = res.locals
    const userId = user.dataValues.userId
    const { todoId } = req.params
    const data = await Todo.findOne({
        where:{todoId}
    })

    if (userId === data.dataValues.userId) {
        const update = await Todo.upsert({
            todoId,
            status: !data.dataValues.status
        })
        return res.json({
            update,
            result: 'success',
            success: true
        })
    } else {
        return res.status(403).json({ message: 'Forbidden' })
    }
})

todos.post('/delete/:todoId', authMiddleware, async(req, res) => {
    const { user } = res.locals
    const userId = user.dataValues.userId
    const { todoId } = req.params

    const data = await Todo.findOne({
        where:{todoId}
    })

    if (!data) {
        return res.status(400).json({ errorMessage: "Data not found" })
    }

    if (userId === data.dataValues.userId) {
        const del = await data.destroy()
        return res.json({
            result: 'success',
            success: true
        })
    } else {
        return res.status(403).json({ message: 'Forbidden' })
    }
})

module.exports = todos