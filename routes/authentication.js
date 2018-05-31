const User = require('../models/user');

module.exports =(router) => {
    router.post('/register', (req, res) => {
        if(!req.body.email){
            res.json({ success: false, message: 'You must provide an e-mail'});
        } else {
            if(!req.body.username){
                res.json({ success: false, message : 'You must provide a username'});
            }else {
                if(!req.body.password){
                    res.json( {success: false, message: 'You must provide a password'})
                }
                else{
                    let user = new User({
                        username: req.body.username.toLowerCase(),
                        email: req.body.email.toLowerCase(),
                        password: req.body.password,
                    });
                    user.save((err)=> {
                        if(err){
                            if(err.code == 11000){
                                res.json({success: false, message: 'Username and Email already exists:'});
                            } else{
                                res.json({success: false, message: 'Could not save User. Error: ', err});
                            }
                        }else {
                            res.json({ success: true, message: 'User Saved'})
                        }
                    })
                }
            }
        }
    });
    return router;
}