const ThoughtModel = require('../models/thought.js')

async function index(req, res) {
  try {
    const thoughts = await ThoughtModel.find({})
    res.status(200).json({thoughts})
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
}

async function show(req, res) {
  try {
    const thought = await ThoughtModel.findById(req.params.id)
    res.status(200).json({thought})
  } catch (error) {
    res.status(500).json({error})
  }
}

async function create(req, res) {
  try {
    const thought = await ThoughtModel.create({
      ...req.body,
    })
    res.status(201).json({thought})
  } catch (error) {
    res.status(500).json({error})
  }
}

async function update(req, res) {
  try {
    const thought = await ThoughtModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(202).json({thought})
  } catch (error) {
    res.status(500).json({error})
  }
}

async function deleteThought(req, res) {
  try {
    const thought = await ThoughtModel.findByIdAndDelete(req.params.id)
    if (!thought) {
      return res.status(500).json({error})
    }
    res.status(202).json({thought})
  } catch (error) {
    res.status(500).json({error})
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  delete: deleteThought,
}