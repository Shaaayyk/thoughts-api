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

async function update(req, res) {
  try {
    const thought = await ThoughtModel.findOne({ 'additions._id': req.params.id })
    if (!thought) {
      return res.status(500).json({ error })
    }
    const addition = thought.additions.id(req.params.id)
    addition.set(req.body)
    await thought.save()
    res.status(201).json({thought})
  } catch (error) {
    res.status(500).json({error})
  }
}

async function deleteAddition (req, res) {
  try {
    const thought = await ThoughtModel.findOne({ 'additions._id': req.params.id })
    if (!thought) {
      return res.status(500).json({error})
    }
    thought.additions.remove(req.params.id)
    await thought.save()
    res.status(202).json({thought})
  } catch (error) {
    res.status(500).json({error})
  }
}

module.exports = {
  create,
  update,
  delete: deleteAddition,
}