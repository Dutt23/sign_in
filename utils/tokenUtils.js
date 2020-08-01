const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/keys').jwtSecret;

exports.verifyAndGetUserByToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret)
    return decoded.user;
  } catch (err) {
    return null;
  }
}

exports.signToken = async (userId) => {
  const payload = {
    user: {
      id: userId
    }
  }
  return await jwt.sign(
    payload,
    jwtSecret,
    { expiresIn: '5 days' },
  );
}