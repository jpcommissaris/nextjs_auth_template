const formidable = require('formidable')
const slugify = require('slugify')
const stripHtml = require('string-strip-html')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../helpers/dbErrorHandler')

const Blog = require('../models/blog')
const Category = require('../models/category')
const Tag = require('../models/category')


exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        let error1 = err || validateFields(fields)
        if(error1){
            return handleError(res, error1)
        } 
        fields.name = req.profile.name
        fields.id = req.user._id
        let [blog, error2] = createBlogWithFields(fields, files)
        if(error2){
            return handleError(res, error2)
        }
        blog.save((err, result) => {
            if(err){
                console.log(err)
                return handleError(res, err)
            }
            return res.json(result)
        })
    })

}

const handleError = (res, error) => {
    return res.status(400).json({
        error: error
    })
}

const validateFields = (fields) => {
    const {title, body, categories, tags} = fields
    error = 0
    //validate fields
    if(!title || !title.length){
        error = 'title is required'
    }
    else if(!body || body.length < 20){
        error =  'body is too short'
    }
    else if(!categories|| categories.length === 0){
        error =  'at least one category is required'
    }
    else if(!tags|| tags.length === 0){
        error =  'at least one tag is required'
    }
    return error
}

const createBlogWithFields = (fields, files) => {
    const {title, body, categories, tags, name, id} = fields
    let blog = new Blog()
    let error = 0
    blog.title = title
    blog.body = body
    blog.excerpt = stripHtml(body.substring(0,250)).result+'... read more'
    blog.slug = slugify(title).toLowerCase()
    blog.meta_title = `${title} | ${process.env.APP_NAME} | ${name}`
    blog.meta_description = stripHtml(body.substring(0,160)).result
    blog.postedBy= id
    blog.categories = categories && categories.split(',')
    blog.tags = tags && tags.split(',')
    if(files.photo){ 
        if(files.photo.size > 1000000){
            error =  'image could not uploaddd'
        }else{
            blog.photo.data = fs.readFileSync(files.photo.path)
            blog.photo.contentType = files.photo.type
        }
    }
    return [blog, error]
}