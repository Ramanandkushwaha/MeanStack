const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:  {type: String, unique: true, lowercase: true, required: true},
    email:     {type: String, unique: true, lowercase: true, required: true},
    password:  {type: String, required: true},
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', userSchema);