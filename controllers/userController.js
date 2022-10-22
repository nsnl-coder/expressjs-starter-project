// remove unwanted data from user
const sanitizeData = (req, res, next) => {
  // 1) Sanitize unwanted data
  const {
    role,
    passwordChangedAt,
    passwordResetToken,
    passwordResetTokenExpires,
    isVerified,
    ...sanitizeData
  } = req.body
  req.body = sanitizeData
  next()
}

const userController = {
  sanitizeData,
}

module.exports = userController
