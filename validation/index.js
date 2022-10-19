const validateOne = async (data, schema, res) => {
  try {
    await schema.validate(data, { abortEarly: false })
  } catch (err) {
    const errors = err.inner.map((el) => {
      return { field: el.path, error: el.message }
    })
    res.status(400).json(errors)
  }
}

module.exports = validateOne
