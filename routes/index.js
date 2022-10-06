const router = require('express').Router();
const User = require('../models/user');
const verify = require("../middlewares/authorize");

router.get('/', async (req,res,next)=>{
    const users = await User.find()
    .then((data)=>{
        return res.status(200).send(data)
    }).catch((err)=>{
        return res.status(400).send(err)
    })
    next();
})

module.exports = router;