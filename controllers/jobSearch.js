const User = require('../models/user');
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');

module.exports = {
    addSearch,
}

async function addSearch(req, res){
    try {
        const user = await User.findOne({email: req.body.user.email});
        if(!user) return res.status(401).json({err: 'bad credentials'});
        user.savedJobSearches.push(req.body);
        user.save();
        const token = req.body.token;
        res.json({token});
    } catch (error) {
        res.status(400).json({err:'bad request'});
    }
}