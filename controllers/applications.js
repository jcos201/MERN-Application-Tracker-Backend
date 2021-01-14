const User = require('../models/user');

module.exports = {
    showAllAppListings,
    addAppListing,
    updateAppListing,
    deleteAppListing,
}

async function showAllAppListings(req,res){

};

async function addAppListing(req, res){
    console.log('got to addAppListing');
    console.log('req.body')
    console.log(req.body)
    try {
        const user = await User.findOne({ email: req.body.user.email });
        if(!user) return res.status(401).json({err: 'bad credentials'});
        user.applications.push(req.body);
        user.save();
        console.log('user')
        console.log(user);
        const token = req.body.token;
        res.json({ token });
        
    } catch (error) {
        res.status(400).json({err: 'bad request'});
    }





};

async function updateAppListing(req, res){

};

async function deleteAppListing(req, res){

};

function createListing(user, listing) {

}