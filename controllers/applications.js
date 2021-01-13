const User = require('../models/user');

module.exports = {
    showAllAppListings,
    addAppListing,
    updateAppListing,
    deleteAppListing,
}

async function showAllAppListings(req,res){
    try {
        const user = await User.findOne({ email: req.body.email });

    } catch (error) {
        res.status(400).json({err: 'bad request'});

    }

};

async function addAppListing(req, res){

};

async function updateAppListing(req, res){

};

async function deleteAppListing(req, res){

};