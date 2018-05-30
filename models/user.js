const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    username:  {type: String, unique: true, lowercase: true, required: true},
    email:     {type: String, unique: true, lowercase: true, required: true},
    password:  {type: String, required: true},
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password'))
    return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if(err) return next(err);
        this.password = hash;
        next();
    });
})

module.exports = mongoose.model('user', userSchema);