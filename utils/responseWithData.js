const responseWithData = (res, data, statusCode) => {
  let results = Array.isArray(data) ? data.length : undefined
  const status = statusCode.toString().startsWith('2') ? 'success' : 'fail'

  res.status(statusCode || 200).json({
    status,
    results,
    data,
  })
}

module.exports = responseWithData
