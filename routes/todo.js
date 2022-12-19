const express = require('express');
const todo = express.Router()

const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {Todo} = require('../models');
todo.use(cors());

todo.get('')