
// const Failure = require('../models/Failures')
const errorConstants = require('../constants/errorConstants')


module.exports = function (err, req, res, next) {
  console.log(err)
  console.log("ERROR")
//   storeError(err, { request: req.body })
  res.status(500).send({ success: false, message: mapErrorRes(err) })
}

// storeError = (e, properties = null) => {
//   var operation_failure_type = errorConstants[e.name]
//   var reason = e.message
//   var error = e

//   const newFailure = new Failure({
//     operation_failure_type : !!operation_failure_type ? operation_failure_type : 0,
//     reason,
//     error,
//     properties
//   })
//   newFailure.save()
// }

mapErrorRes = (error) => {


  var errorMessage = 'Something broke!';
  if (error.name.includes('MongoError')) {
    if (error.code === 11000)
      if (error.message.includes('$idx_email_users dup key'))
        errorMessage = 'User with this email already exists'
  }
  if (error.name==='TransactionError') {
    errorMessage = error.message
  }
  return errorMessage
}