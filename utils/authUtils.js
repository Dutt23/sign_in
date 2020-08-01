const { findUserByEmail, comparePassword } = require('./userUtils')

exports.findUserByEmail = (email) =>{
    const user = findUserByEmail(email);
    return user;
}

exports.verifyUserPassword = (id, password) =>{
  return comparePassword(id, password)
}