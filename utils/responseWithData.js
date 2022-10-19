const responseWithData = (res, data, statusCode = 200) => {
  let results = Array.isArray(data) ? data.length : undefined
  const status = statusCode.toString().startsWith('2') ? 'success' : 'fail'

  res.status(statusCode).json({
    status,
    results,
    data,
  })
}

module.exports = responseWithData
