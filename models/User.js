const mongoose = require('@middlewares/mongoose')
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		lowercase: true,
		required: true,
		indexed: true,
		validate: {
				validator: function(mail) {
						return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
				},
				message: "Please enter a valid email"
		},
	},
	name :{
		type: String,
		trim: true,
		lowercase: true,
    required: true,
		indexed: true,
	},
	password: { type: String, required: true },
	created_at: {
		type: Date,
		default: Date.now
	},
	properties:{
		type: Map
	},
	status: {
		type: Number,
		default: 1
	},
})

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};
module.exports = mongoose.model('users', UserSchema);