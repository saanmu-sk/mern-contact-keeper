// Import node_modules
const mongoose = require('mongoose')
const config = require('config')

// Get mongodb url
const db = config.get("mongoURI")

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log('Mongodb Connected')
    } catch (error) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connectDB