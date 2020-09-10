const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxlength: 32,
    },
    slug: {
        type: String,
        index: true,
        unique: true, 
    },
  
}, {timestamp: true})

module.exports = mongoose.model('Tag', tagSchema)