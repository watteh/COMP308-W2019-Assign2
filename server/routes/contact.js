// contact.js -- Ryan Watson -- 300920674 -- 03/25/19

let express = require('express');
let router = express.Router();

let jwt = require('jsonwebtoken');

let passport = require('passport');

// create a reference to the controller
let contactController = require('../controllers/contact');

/* GET Contact List page - READ Operation */
router.get('/', passport.authenticate('jwt', { session: false }), contactController.displayContactList);

/* GET Route for the Add page
    this will display the Add page */
router.get('/add', passport.authenticate('jwt', { session: false }), contactController.displayAddPage);

/* POST route for processing the Add page */
router.post('/add', passport.authenticate('jwt', { session: false }), contactController.addContact);

/* GET Route for the Edit page
    this will display the Edit page */
router.get('/edit/:id', passport.authenticate('jwt', { session: false }), contactController.displayContact);

/* POST route for processing the Edit page */
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), contactController.updateContact);

/* GET request to perform delete action */
router.get('/delete/:id', passport.authenticate('jwt', { session: false }), contactController.deleteContact);

module.exports = router;