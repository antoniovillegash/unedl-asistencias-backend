var {Schema, model} = require('mongoose');

var userSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        required: true,
    },
    date:{
        type: Date,
        default:Date.now
    }
},
{
    timestamps:true
})


module.exports = model('users',userSchema);