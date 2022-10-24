const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_uri, { }, (err) => {
    if(err) {
        console.log(err)
        process.exit(1)
    }
})

const user_schema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = {
    S_user : mongoose.model('S_users', user_schema)
}
