const router = require('express').Router();
const usersCtrl = require('../controllers/users');
const applicationsCtrl = require('../controllers/applications');


router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

router.post('/addapplication', applicationsCtrl.addAppListing);



module.exports = router; 