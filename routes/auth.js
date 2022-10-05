const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../middlewares/validation');
const jwt = require('jsonwebtoken');
const verify = require("../middlewares/authorize");

router.post('/register', async (req, res, next) => {
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) {
        return res.status(400).send("User Already Exists! Register with different credentials!")
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
    });
    const validate = registerValidation(req.body)
    if (validate.error) {
        return res.status(400).send(validate.error.details[0].message)
    }
            const savedUser = await user.save();
            return res.status(200).json({ user: user._id });
        
    next();
});

router.post('/login', async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send("Email or Password is wrong!")
    } else {
        const validate = loginValidation(req.body)
        if (validate.error) {
            return res.status(400).send(validate.error.details[0].message)
        }
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) {
            return res.status(400).send("Invalid Password!")
        }
        const token = jwt.sign({_id:user._id},process.env.SECRET_TOKEN)
        return res.status(200).header({authorization_code:token}).send(token);
        
    }
   
});

//test
router.get('/users',verify,(req,res)=>{
    res.status(200).send({res:"access granted"})
})

module.exports = router;