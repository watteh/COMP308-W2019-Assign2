// index.js -- Ryan Watson -- 300920674 -- 03/25/19

let express = require('express');
let router = express.Router();
let passport = require('passport');
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// define the user model
let userModel = require('../models/user');
let User = userModel.User; //alias

// Method to process login
module.exports.processLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({
                success: false,
                msg: 'Error: login failed.'
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            const payload = {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.secret, {
                expiresIn: 604800 // 1 week
            });

            return res.json({
                success: true,
                msg: 'User login successful!',
                user: {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    email: user.email
                },
                token: authToken
            });
        });
    })(req, res, next);
}

// Method to process registration
module.exports.processRegister = (req, res, next) => {
    // define a new User object
    let newUser = new User({
        username: req.body.username,
        // password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(
        newUser,
        req.body.password,
        (err) => {
            if (err) {
                console.log('Error: Inserting new user');
                if (err.name == "UserExistsError") {
                    console.log('Error: Inserting new user');
                }
                return res.json({
                    success: false,
                    msg: 'Error: registration failed.'
                });
            } else {
                // if no error exists, then registration is successful
                // redirect the user
                return res.json({
                    success: true,
                    msg: 'Registration successful!'
                });
            }
        }
    );
}

// Method to process logout
module.exports.performLogout = (req, res, next) => {
    req.logout();
    return res.json({
        success: true,
        msg: 'User logged out.'
    });
}