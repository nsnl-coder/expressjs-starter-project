const yup = require('yup')

const email = yup.string().email('nodePlease enter a valid email').required('nodeRequired')

const onUpdateSchema = yup.object().shape({ email })
module.exports = onUpdateSchema
