const router = require('express').Router();
const usersCtrl = require('../controllers/users');
const applicationsCtrl = require('../controllers/applications');
const jobSearchCtrl = require('../controllers/jobSearch');
const { application } = require('express');


router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

router.post('/addapplication', applicationsCtrl.addAppListing);
router.get('/applications' , applicationsCtrl.showAllAppListings);
router.get('/applications/:id', applicationsCtrl.showOneListing);
router.put('/applications/:id', applicationsCtrl.updateAppListing);
router.delete('delete/:id', applicationsCtrl.deleteAppListing);


router.post('/addSearch', jobSearchCtrl.addSearch);




module.exports = router; 