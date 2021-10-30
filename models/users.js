const mongoose = require('mongoose');
const Shema = mongoose.Schema;


const users =  new Shema({
    username :{
        type: String,
        required : true,
        unique : true,
    },
    password :{
        type :String,
        required : true,
    },
    admin :{
        type : Boolean,
        default : true
    }
})

const Users = mongoose.model('users', users);

module.exports = Users;