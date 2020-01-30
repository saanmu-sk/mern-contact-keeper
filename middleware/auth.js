// Import node_modules
const jwt = require('jsonwebtoken')
const config = require('config')

// Export middleware
module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token')

    // Check if not token
    if (!token) {
        return res.status(501).json({ msg: 'No token, authorization denied!' })
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid!' })
    }
}
