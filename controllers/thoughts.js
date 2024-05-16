const ThoughtModel = require('../models/thought.js')

async function index(req, res) {
  try {
    const thoughts = await ThoughtModel.find({})
    console.log(thoughts)
    res.status(200).json({thoughts})
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
}

async function show(req, res) {
  try {
    
  } catch (error) {
    
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

module.exports = {
  index,
  create,
}