const router = require('@middlewares/routes')
const { validator, validate } = require('@middlewares/controllerValidations')
const User = require('@models/User')
const { signToken } = require('@utils/tokenUtils')

router.post("/sign_up", [
  validator('sign_up'), validate
], async (req, res, next) => {

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  try {
    const newUser = new User({
      email,
      name,
      password
    })
    const user = await newUser.save()
    const token = await signToken(user.id)
    if (token)
      return res.json({ success: true, token })
    //   const transactionId = await storeTransaction(req)
    return res.json({ success: false, message: "Opps something went wrong" });
  }
  catch (e) {
    next(e)
  }
});

module.exports = router;