const User = require('../models/user');

module.exports = {
    showAllAppListings,
    addAppListing,
    updateAppListing,
    deleteAppListing,
}

async function showAllAppListings(req,res){
    try {
        //console.log('inside showAllAppListings')
        //console.log(req.body);
        const user = await User.findOne({ email: req.user.email });
       // console.log('application array:')
        //console.log(user.applications)
        const applicationArray = user.applications;
        res.json({ applicationArray })
    } catch (error) {
        res.status(400).json({err: 'bad request'})
    }

};

async function addAppListing(req, res){
    console.log('got to addAppListing');
    console.log('req.body')
    console.log(req.body)
    try {
        const user = await User.findOne({ email: req.user.email });
        if(!user) return res.status(401).json({err: 'bad credentials'});
        user.applications.push(req.body);
        await user.save();
        const applicationArray = user.applications;
        //console.log('user applications')
        //console.log(applicationArray);
        const token = req.body.token;
        res.json({ applicationArray });
        
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