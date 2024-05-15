const express = require('express')
const path = require('path')
const logger = require('morgan')

require('dotenv').config();

require('./config/database');


const app = express()

app.use(logger('dev'))
app.use(express.json())

app.get('/*', (req, res) => {
  res.send('Hello there!');
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Express app running on port ${port}`)
});