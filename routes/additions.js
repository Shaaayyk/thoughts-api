const express = require('express')
const router = express.Router()

const additionsController = require('../controllers/additions.js')

router.post('/thoughts/:id/additions', additionsController.create)

module.exports = router