const express = require('express');
const Notes = require('../models/Notes')
var fetchuser = require('../middleware/fetchuser');
const {body, validationResult} = require('express-validator');
const router = express.Router();
// Route 1: Get all the Notes using: GET "/api/auth/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

// Route 2: Add a new Notes using: POST "/api/auth/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be have at least 6 length').isLength({min: 6}),
], async (req, res) => {
    try {
        const {title, description, tag} = req.body;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const note = new Notes({
        title, description, tag, user: req.user.id
    })
    const savedNote = await note.save();
    res.json(savedNote);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})
module.exports = router;