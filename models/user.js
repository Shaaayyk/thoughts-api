const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
}, {
  timestamps: true,
})

// remove password when coverted to JSON
userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password
    return ret
  }
})
// remove password when coverted to an object in populate
userSchema.set('toObject', {
  transform: function (doc, ret, options) {
    delete ret.password
    return ret
  }
})
// check to see if the password was changed, if it was then hash it with bcrypt
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, parseInt(process.env.SALT_ROUNDS), function (error, hash) {
    if (error) return next(error);
    user.password = hash
    next();
  })
})

userSchema.methods.comparePassword = function (tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, function (error, isMatch) {
    if (error) return cb(error);
    cb(null, isMatch);
  })
}

module.exports = mongoose.model('User', userSchema)