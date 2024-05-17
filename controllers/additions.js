const ThoughtModel = require('../models/thought.js')

async function create(req, res) {
  try {
    const thought = await ThoughtModel.findById(req.params.id)
    thought.additions.push(req.body)
    await thought.save()
    res.status(201).json({thought})
  } catch (error) {
    res.status(500).json({error})
  }
}

module.exports = {
  create,
}