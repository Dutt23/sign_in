const router = require('@middlewares/routes')
const { validator, validate } = require('@middlewares/controllerValidations')
const User = require('@models/User')


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
      await newUser.save()

    //   const transactionId = await storeTransaction(req)
      return res.json({ success: true });
    }
    catch (e) {
      console.log("GIGGHI")
      next(e)
    }
  });

  module.exports = router;