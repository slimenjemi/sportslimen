const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    pwd: String,
    confirmPwd: String,
    
});
const user = mongoose.model('User',userSchema);
module.exports = user;