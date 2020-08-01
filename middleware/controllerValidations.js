const { check, validationResult, body } = require('express-validator');

exports.validator = (method) => {
  switch (method) {
    case 'sign_up': {
      return [
        body('name', 'Name is required').notEmpty().bail(),
        body('email', 'Email is required').notEmpty().bail().isEmail().withMessage("Please enter a valid email"),
        body('password', "Password cannot be empty").notEmpty().bail().isLength({ min:6 }).withMessage("Password should have a minimum length of 6"),
        body('confirm_password').custom((value, { req }) => passwordMatcher("confirm_password", req ))
      ]
    }
    default: return [];
  }
}

exports.validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  return res.status(422).json({
    errors: extractErrors(errors),
  })
}

extractErrors = (errors) => {
	const extractedErrors = []
	errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
	return extractedErrors;
}

passwordMatcher = (key, req) =>
{
 if (!(key in req.body))
  return Promise.reject('Password confirmation is required');
 
  if(req.body[key] !== req.body.password)
   return Promise.reject('Passwords do not match');

   return true
}