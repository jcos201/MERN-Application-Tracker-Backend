const router = require('express').Router();
const usersCtrl = require('../controllers/users');
const applicationsCtrl = require('../controllers/applications');
const jobSearchCtrl = require('../controllers/jobSearch');


//user authentication routes
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

//user application routes
router.post('/addapplication', applicationsCtrl.addAppListing);
router.get('/applications' , applicationsCtrl.showAllAppListings);
router.get('/applications/:id', applicationsCtrl.showOneListing);
router.put('/applications/:id', applicationsCtrl.updateAppListing);
router.delete('/delete/:id', applicationsCtrl.deleteAppListing);

//user job search routes
router.post('/addsearch', jobSearchCtrl.addSearch);
router.get('/savedsearches', jobSearchCtrl.showAllSearches);
router.get('/savedsearches/:id', jobSearchCtrl.showOneSearch);
router.delete('/deletesearch/:id', jobSearchCtrl.deleteSearch);

//company names in listing route
router.get('/companynames', applicationsCtrl.getCompanyNames)


module.exports = router; 