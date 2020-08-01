const User = require("@models/User")

exports.findUserByEmail = async (email) => {
  const user =  await User.findOne({ email }).select('-password')
  return user
}

exports.findUserById = async (_id) =>{
  const user =  await User.findOne({ _id }).select('-password')
  return user;
}

exports.comparePassword = async (_id, password) => {
  const user = await User.findOne({ _id })
  return user.validatePassword(password)
}