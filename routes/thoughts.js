const express = require('express')
const router = express.Router()

const thoughtController = require('../controllers/thoughts.js')

router.get('/', thoughtController.index)
router.get('/:id', thoughtController.show)
router.post('/', thoughtController.create)
router.put('/:id', thoughtController.update)
router.delete('/:id', thoughtController.delete)

module.exports = router