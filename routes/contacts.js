// Import node_modules
const express = require('express')
const { check, validationResult } = require('express-validator')

// Import Models
const User = require('../models/User')
const Contact = require('../models/Contact')

// Import Middleware
const auth = require('../middleware/auth')

// Create Router
const router = express.Router()

// @route       GET api/contacts
// @desc        Get all user contacts
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
        res.json(contacts)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

// @route       POST api/contacts
// @desc        Add new contact
// @access      Private
router.post('/', [ auth, [
    check('name', 'Name is Required!').notEmpty()
] ], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { name, phone, email, type } = req.body

    try {
        const newContact = new Contact({
            name,
            phone,
            email,
            type,
            user: req.user.id
        })
        const contact = await newContact.save()
        res.json(contact)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

// @route       PUT api/contacts/:id
// @desc        Update contact
// @access      Private
router.put('/:id', (req, res) => {
    res.send('Update contact')
})

// @route       DELETE api/contacts/:id
// @desc        Delete contact
// @access      Private
router.delete('/:id', (req, res) => {
    res.send('Delete contact')
})

module.exports = router