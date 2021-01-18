const User = require('../models/user');

module.exports = {
    showAllAppListings,
    addAppListing,
    updateAppListing,
    deleteAppListing,
    showOneListing,
}

async function showAllAppListings(req,res){
    try {
        //console.log('inside showAllAppListings')
        //console.log(req.body);
        const user = await User.findOne({ email: req.user.email });
        if(!user) return res.status(401).json({err: 'bad credentials'});

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
       // const token = req.body.token;
        res.json({ applicationArray });
        
    } catch (error) {
        res.status(400).json({err: 'bad request'});
    }





};

async function updateAppListing(req, res){

};

async function deleteAppListing(req, res){

};

async function showOneListing(req, res) {
    console.log('inside show one listing');
    try {
        const user = await User.findOne({ email: req.user.email });
        if(!user) return res.status(401).json({err: 'bad credentials'});
        console.log('application id from req.body');
        console.log(req.params.id);
        const listing = await user.applications.find( application =>  application._id == req.params.id);
        if(!listing) return res.status(401).json({err: 'bad application credentials'});
        console.log(listing)
        res.json({ listing });
        
    } catch (error) {
        res.status(400).json({err: 'bad request'})

    }


}