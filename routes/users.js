const router = require('express').Router();
const usersCtrl = require('../controllers/users');
const applicationsCtrl = require('../controllers/applications');
const jobSearchCtrl = require('../controllers/jobSearch');



router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

router.post('/addapplication', applicationsCtrl.addAppListing);
router.get('/applications' , applicationsCtrl.showAllAppListings);
router.get('/applications/:id', applicationsCtrl.showOneListing);
router.put('/applications/:id', applicationsCtrl.updateAppListing);
router.delete('/delete/:id', applicationsCtrl.deleteAppListing);

router.post('/addsearch', jobSearchCtrl.addSearch);
router.get('/savedsearches', jobSearchCtrl.showAllSearches);
router.get('/savedsearches/:id', jobSearchCtrl.showOneSearch);
router.delete('/deletesearch/:id', jobSearchCtrl.deleteSearch)




module.exports = router; 