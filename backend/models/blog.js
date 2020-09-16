const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        require: true,
        max: 160,
        min: 3
    },
    slug: {
        type: String,
        unique: true,
        require: true, 
        index: true
    },
    excerpt: {
        type: String,
        max: 1000,
    },
    body: {
        type: {},
        max: 2000000,
        min: 20,
        required: true
    },
    meta_title: {
        type: String,
    },
    meta_description: {
        type: String,
    },
    photo: {
        data: Buffer,
        contentType: String,
    }, 
    categories: [{
        type: ObjectId,
        ref: 'Category',
        required: true
    }],
    tags: [{
        type: ObjectId,
        ref: 'Tag',
        required: true
    }],
    postedBy:{
        type: ObjectId,
        ref: 'User'
    }

}, {timestamp: true})

module.exports = mongoose.model('Blog', blogSchema)