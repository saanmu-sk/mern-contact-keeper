// Import node_modules
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

// Import Models
const User = require('../models/User')

// Create Router
const router = express.Router()

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post('/', [
    check('name', 'Please add a name').notEmpty(),
    check('email','Please include a valid Email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min:6 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
        // Check email exist
        let user = await User.findOne({ email })
        if (user) {
            res.status(400).json({ msg: 'User already exists!' })
        }

        // Create a user instance
        user = new User({
            name,
            email,
            password
        })

        // Create a bcrypt salt
        const salt = await bcrypt.genSalt(10)

        // Hash password
        user.password = await bcrypt.hash(password, salt)

        await user.save()
        const payload = {
            user: {
                id:user.id
            }
        }

        // jwt token
        jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
            if (err) throw err
            res.json({ token })
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router