const express = require('express')
const logger = require('morgan')

require('dotenv').config();
require('./config/database');

const thoughtsRouter = require('./routes/thoughts.js')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/thoughts', thoughtsRouter);


const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Express app running on port ${port}`)
});

module.exports = app