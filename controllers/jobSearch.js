const User = require('../models/user');

module.exports = {
    addSearch,
    showAllSearches,
    showOneSearch,
    deleteSearch,
}

async function addSearch(req, res){
    console.log('reached addSearch');
    try {
        const user = await findUser(req.user.email);
        if(!user) return res.status(401).json( {err: 'bad credentials'});

        user.savedJobSearches.push(req.body);
        await user.save();

        const jobSearchArray = user.savedJobSearches;
        res.json({ jobSearchArray });

    } catch (error) {
        res.status(400).json( {err: 'bad job search addition request'});
    }
}

async function showAllSearches(req,res){
    console.log('inside show all searches');
    try {
        const user = await findUser(req.user.email);
        if(!user) return res.status(401).json( {err: 'bad credentials'} );
        const jobSearchArray = user.savedJobSearches;

        res.json({ jobSearchArray });
    } catch (error) {
        res.status(400).json( {err: 'bad job search addition request'});
    }

}

async function showOneSearch(req,res){
    console.log('inside showOneSearch');
    try {
        const user = await findUser(req.user.email);
        if(!user) return res.status(401).json( {err: 'bad credentials'} );

        const searchListing = await findOneJobSearch(user, req.params.id);
        if(!searchListing) return status(401).json( {err: 'bad search credentials'});

        res.json({ searchListing });
    } catch (error) {
        res.status(400).json( {err: 'bad job search id request'})
    }
    
}

async function deleteSearch(req,res){
    console.log('reached deleteSerach function');
    try {
        const user = await findUser(req.user.email);
        if(!user) return res.status(401).json( {err: 'bad credentials'} );

        const searchListing = await findOneJobSearch(user, req.params.id);
        if(!searchListing) return res.status(401).json( {err: 'cannot find saved job search'} );

        indx = await user.savedJobSearches.indexOf(searchListing);
        user.savedJobSearches.splice(indx,1);
        await user.save();

        const jobSearchArray = user.savedJobSearches;
        res.json({ jobSearchArray });
    } catch (error) {
        res.status(400).json( {err: 'bad search delete request'} );
    }
}

function findOneJobSearch(user, searchId) {
    return user.savedJobSearches.find( search =>  search._id == searchId);
}

function findUser(userEmail) {
    return User.findOne({ email: userEmail });
}