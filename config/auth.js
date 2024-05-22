const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  let token = req.get('Authorization') || req.query.token || req.body.token
  if (token) {
    token = token.replace('Bearer ', '')
    if (token === 'null') {
      next()
    } else {
      jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
        if (error) {
          next(error)
        } else {
          req.user = decoded.user
          next()
        }
      })
    }
  } else {
    next()
  }
}