const express = require('express')
const logger = require('morgan')
const cors = require('cors')

// env variables
require('dotenv').config();
// mongodb setup
require('./config/database');

// setup routers
const usersRouter = require('./routes/users.js')
const thoughtsRouter = require('./routes/thoughts.js')
const additionsRouter = require('./routes/additions.js')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// handles token verify and sets req.user
app.use(require("./config/auth"));
// setup the routes
app.use('/api/users', usersRouter);
app.use('/api/thoughts', thoughtsRouter);
app.use('/api', additionsRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Express app running on port ${port}`)
});

module.exports = app