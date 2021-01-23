const User = require('../models/user');
const CompanyName = require('../models/companyName');


module.exports = {
    addAppListing,
    showAllAppListings,
    updateAppListing,
    deleteAppListing,
    showOneListing,
    getCompanyNames,
}

async function addAppListing(req, res){
    console.log('got to addAppListing');

    try {
        const user = await User.findOne({ email: req.user.email });
        if(!user) return res.status(401).json({err: 'bad credentials'});

        const compName = req.body.companyName;
        await saveCompany(compName);

        user.applications.push(req.body);
        await user.save();

        const applicationArray = user.applications;
        res.json({ applicationArray });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({err: 'bad request'});
    }

};

async function showAllAppListings(req,res){
    try {
        const user = await User.findOne({ email: req.user.email });
        if(!user) return res.status(401).json({err: 'bad credentials'});

        const applicationArray = user.applications;
        res.json({ applicationArray })
    } catch (error) {
        res.status(400).json({err: 'bad request'})
    }

};


async function updateAppListing(req, res){
    console.log('inside update Listing');
    try {
        const user = await findUser(req.user.email);
        if(!user) return res.status(401).json( {err: 'bad credentials'} );

        const application = await findOneApplication(user, req.params.id);
        if(!application) return res.status(401).json( {err: 'cannot find application'} );


        indx = await user.applications.indexOf(application);
        user.applications.splice(indx, 1, req.body);
        await user.save();
        const compName = req.body.companyName;
        await saveCompany(compName);

        const applicationArray = user.applications;
        res.json({ applicationArray });

    } catch (error) {
        res.status(400).json({err: 'bad request to update Listing'})
    }



};

async function deleteAppListing(req, res){
    console.log('reached deletion function');
    try {
        const user = await findUser(req.user.email);
        if(!user) return res.status(401).json( {err: 'bad credentials'} );

        const application = await findOneApplication(user, req.params.id);
        if(!application) return res.status(401).json( {err: 'cannot find application'} );
        
        indx = await user.applications.indexOf(application);
        user.applications.splice(indx, 1);
        await user.save();
        const applicationArray = user.applications;
        res.json({ applicationArray });
        
    } catch (error) {
        res.status(400).json( {err: 'bad deletion request'} )
    }
};

async function showOneListing(req, res) {
    console.log('inside show one listing');
    try {
        const user = await User.findOne({ email: req.user.email });
        if(!user) return res.status(401).json({err: 'bad credentials'});
        //console.log('application id from req.body');
        //console.log(req.params.id);
        const listing = await user.applications.find( application =>  application._id == req.params.id);
        if(!listing) return res.status(401).json({err: 'bad application credentials'});
        //console.log(listing)
        res.json({ listing });
        
    } catch (error) {
        res.status(400).json({err: 'bad request'})
    }
}

async function getCompanyNames(req,res){
    console.log('inside getCompanyNames');
    let companyArray =[];
    await CompanyName.find({}, (err, companies) => {
        if(err) { return res.status(401).json({ err: 'bad company name request'}) }
        companies.map(company => {
            console.log(company.name)
            companyArray.push(company.name)
        })
        console.log(companyArray)
        res.json(companyArray) 
    });

}

async function saveCompany(name) {
    let found = await CompanyName.find( {name} );
    //console.log(found)
    if(found.length == 0) {
        await CompanyName.create({name});
        await CompanyName.save();
    }
}

function findOneApplication(user, applicationId) {
    return user.applications.find( application =>  application._id == applicationId);
}

function findUser(userEmail) {
    return User.findOne({ email: userEmail });
}