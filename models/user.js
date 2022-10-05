const mongoose= require('mongoose')

const user = new mongoose.Schema({
    name:{
        required:true,
        type:String,
        max:255,
        min:6
    },
    email:{
        required:true,
        type:String,
        max:225,
        min:6
    },
    password:{
        required:true,
        type:String,
        max:1024,
        min:6
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('user',user)