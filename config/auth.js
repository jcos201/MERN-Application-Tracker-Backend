const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
    //console.log('inside auth file')
    let token = req.get('Authorization') || req.query.token || req.body.token;
    //console.log('token inside auth file');
    //console.log(token)
    if(token) {
        token = token.replace('Bearer ', '');
        //console.log('token after replace function')
        //console.log(token)
        jwt.verify(token, SECRET, function(err, decoded) {
            if(err) {
                next(err);
            } else {
                //console.log('decoded')
                //console.log(decoded)

                req.user = decoded.user;
                next();
            }
        });
    } else {
        next();
    }
};