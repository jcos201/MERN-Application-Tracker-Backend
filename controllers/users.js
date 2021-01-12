const User = require('../models/user');

module.exports = {
    signup,
}

async function signup(req,res) {
    console.log('entered async function')
    try {
        console.log('req:')
        console.log(req)
        const user = await User.create(req.body);
        res.json({ user });
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'bad request' })
    }
}