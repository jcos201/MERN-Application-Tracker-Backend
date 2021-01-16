const router = require('express').Router();
const usersCtrl = require('../controllers/users');
const applicationsCtrl = require('../controllers/applications');
const jobSearchCtrl = require('../controllers/jobSearch');


router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

router.post('/addapplication', applicationsCtrl.addAppListing);
router.get('/applications/:id' , applicationsCtrl.showAllAppListings);

router.post('/addSearch', jobSearchCtrl.addSearch);




module.exports = router; 