const mongoose = require('mongoose')

const additionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, {
  timestamps: true, 
})

const thoughtSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueBoolean: { type: Boolean, default: false },
  dueDate: { type: Date, default: null },

  additions: [additionSchema],

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Thought', thoughtSchema)