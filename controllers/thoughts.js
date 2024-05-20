const ThoughtModel = require('../models/thought.js')

async function index(req, res) {
  try {
    const thoughts = await ThoughtModel.find({}).populate("user").exec()
    return res.status(200).json({thoughts})
  } catch (error) {
    return res.status(500).json({error})
  }
}

async function show(req, res) {
  try {
    const thought = await ThoughtModel.findById(req.params.id).populate("user").exec()
    return res.status(200).json({thought})
  } catch (error) {
    return res.status(500).json({error})
  }
}

async function create(req, res) {
  try {
    const thought = await ThoughtModel.create({
      ...req.body,
      user: req.user,
    })
    await thought.populate('user')
    return res.status(201).json({thought})
  } catch (error) {
    return res.status(500).json({error})
  }
}

async function update(req, res) {
  try {
    const thought = await ThoughtModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.status(202).json({thought})
  } catch (error) {
    return res.status(500).json({error})
  }
}

async function deleteThought(req, res) {
  try {
    const thought = await ThoughtModel.findByIdAndDelete(req.params.id)
    if (!thought) {
      return res.status(500).json({error: "error here"})
    }
    return res.status(202).json({thought})
  } catch (error) {
    return res.status(500).json({error})
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  delete: deleteThought,
}