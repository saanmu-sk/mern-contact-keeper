// Import node_modules
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

// Import Middleware
const auth = require('../middleware/auth')

// Import Models
const User = require('../models/User')

// Create Router
const router = express.Router()

// @route       GET api/auth
// @desc        Get a logged in user
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

// @route       POST api/auth
// @desc        Auth user and get token
// @access      Public
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
        // Check email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }

        // Check Password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }

        // jwt token
        const payload = {
            user: {
                id:user.id
            }
        }
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