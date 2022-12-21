const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

const PORT = process.env.SERVER_PORT

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

const User = require('./routes/user')
app.use('/user', User)

const Todos = require('./routes/todo')
app.use('/todos', Todos)

app.listen(PORT, () => {
    console.log(PORT+' port is open for todo server');
})