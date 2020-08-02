const { check, validationResult, body } = require('express-validator');
const { verifyAndGetUserByToken } = require("@utils/tokenUtils")
const { findUserByEmail, verifyUserPassword } = require("@utils/authUtils")

exports.validator = (method) => {
  switch (method) {
    case 'sign_up': {
      return [
        body('name', 'Name is required').notEmpty().bail(),
        body('email', 'Email is required').notEmpty().bail().isEmail().withMessage("Please enter a valid email"),
        body('password', "Password cannot be empty").notEmpty().bail().isLength({ min: 6 }).withMessage("Password should have a minimum length of 6"),
        body('confirm_password').custom((value, { req }) => passwordMatcher("confirm_password", req))
      ]
    }
    case 'login': {
      return [
        body('email', 'Email is required').notEmpty().bail().isEmail().withMessage("Please enter a valid email").custom((value, { req }) => findUser(req)),
        body('password', "Password cannot be empty").notEmpty().bail().isLength({ min: 6 }).withMessage("Password should have a minimum length of 6").bail().custom((value, { req }) => verifyPassword(req)),
      ]
    }
    default: return [];
  }
}

findUser = async (req) => {
  const user = await findUserByEmail(req.body.email)
  if (!user)
    return Promise.reject("No user with this email id found")
  req.user = user;
  return true
}

verifyPassword = async (req) => {
  if (!("user" in req))
    return;
  try {
    const verify = await verifyUserPassword(req.user.id, req.body.password);
    if (!verify)
      return Promise.reject('Please check the password you entered');
    return;
  }
  catch (err) {
    throw err;
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
  // errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  errors.array().map(err => extractedErrors.push({ 'message': err.msg }))
  return extractedErrors[0];
}

passwordMatcher = (key, req) => {
  if (!(key in req.body))
    return Promise.reject('Password confirmation is required');

  if (req.body[key] !== req.body.password)
    return Promise.reject('Passwords do not match');

  return true
}

exports.authValidation = async (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }
  // Verify token
  try {
   const user = await verifyAndGetUserByToken(token)
   
    console.log(user)
    if (user) {
      req.user = user;
      next();
    }
    else {
      return res.status(401).json({ succes: false, message: 'Token is not valid' });
    }
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ succes: false, message: 'Server Error' });
  }
}