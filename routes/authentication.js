const User = require('../models/user');

module.exports =(router) => {
    router.post('/register', (req, res) => {
        res.send('Hello Word');
    })
    return router;
}