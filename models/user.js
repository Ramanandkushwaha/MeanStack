const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


// Validate Function to check e-mail length
let emailLengthChecker = (email) => {
    // Check if e-mail exists
    if (!email) {
      return false; // Return error
    } else {
      // Check the length of e-mail string
      if (email.length < 5 || email.length > 30) {
        return false; // Return error if not within proper length
      } else {
        return true; // Return as valid e-mail
      }
    }
  };
  
  // Validate Function to check if valid e-mail format
  let validEmailChecker = (email) => {
    // Check if e-mail exists
    if (!email) {
      return false; // Return error
    } else {
      // Regular expression to test for a valid e-mail
      const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return regExp.test(email); // Return regular expression test results (true or false)
    }
  };
  
  // Array of Email Validators
  const emailValidators = [
    // First Email Validator
    {
      validator: emailLengthChecker,
      message: 'E-mail must be at least 5 characters but no more than 30'
    },
    // Second Email Validator
    {
      validator: validEmailChecker,
      message: 'Must be a valid e-mail'
    }
  ];

const userSchema = new Schema({
    username:  {type: String, unique: true, lowercase: true, required: true, validate: emailValidators },
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

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('user', userSchema);