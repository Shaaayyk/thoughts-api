const express = require('express')
const router = express.Router()

const additionsController = require('../controllers/additions.js')

router.post('/thoughts/:id/additions', additionsController.create)
router.put('/additions/:id', additionsController.update)
router.delete('/additions/:id', additionsController.delete)

module.exports = router