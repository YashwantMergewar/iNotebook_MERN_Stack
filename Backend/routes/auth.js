const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body, validationResult} = require('express-validator');

// Create s User using: POST "/api/auth/". Doesn't require Auth
router.post('/', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Passwors must be have at least 6 length').isLength({min: 6}),
], (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user))
    .catch(err=> {console.log(err)
    res.json({error: 'Please enter a unique email'})})
})
module.exports = router;