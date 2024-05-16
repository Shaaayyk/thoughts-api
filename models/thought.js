const mongoose = require('mongoose')

const additionSchema = new mongoose.Schema({
  content: { type: String, required: true },
}, {
  timestamps: true, 
})

const thoughtSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },

  additions: [additionSchema]
}, {
  timestamps: true,
})

module.exports = mongoose.model('Thought', thoughtSchema)