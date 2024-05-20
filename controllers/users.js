const UserModel = require('../models/user.js')
const jwt = require('jsonwebtoken')

async function signUp(req, res) {
  try {
    const user = new UserModel({
      ...req.body,
    })
    await user.save()
    const token = createJWT(user)
    return res.status(201).json({token})
  } catch (error) {
    return res.status(500).json({error})
  }
}

async function login(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) return res.status(500).json({ error: "error here" })
    user.comparePassword(req.body.password, (error, isMatch) => {
      if (isMatch) {
        const token = createJWT(user)
        return res.status(200).json({token})
      } else {
        return res.status(500).json({error})
      }
    })
  } catch (error) {
    return res.status(500).json({error})
  }
}

function createJWT(user) {
  return jwt.sign(
    { user },
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

module.exports = {
  signUp,
  login,
}