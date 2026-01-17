const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        unique: true,
        required: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    urlVisited: [
        {
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
})

const urlModel = mongoose.model('url', urlSchema)
module.exports = urlModel
