const router = require('@middlewares/routes')
const { validator, validate, authValidation } = require('@middlewares/controllerValidations')
const { signToken } = require('@utils/tokenUtils')
const { findUserById } = require('@utils/userUtils')

router.post("/login", [
  validator('login'), validate
], async (req, res, next) => {
  const user = req.user
  try {
    const token = await signToken(user.id)
    if (token)
      return res.json({ success: true, token })
  }
  catch (err) {
    console.log(err)
    res.json({ success: false, message: "Please try again later" })
  }


});


router.get('/', authValidation, async (req, res) => {
  console.log(req.user.id)
  try {
    const user = await findUserById(req.user.id)
    if (user)
    return res.json({ user });

    res.status(401).send("Un authorised")
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;