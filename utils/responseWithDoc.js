const responseWithDoc = (res, doc, statusCode) => {
  let results = doc.length > 1 ? doc.length : null

  res.status(statusCode || 200).json({
    status: 'success',
    results,
    data: {
      data: doc,
    },
  })
}

module.exports = responseWithDoc()
