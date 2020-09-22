const formidable = require('formidable')
const slugify = require('slugify')
const stripHtml = require('string-strip-html')
const _ = require('lodash')
const fs = require('fs')
const {errorHandler} = require('../helpers/dbErrorHandler')

const Blog = require('../models/blog')
const Category = require('../models/category')
const Tag = require('../models/category')

const handleError = (res, error) => {
    return res.status(400).json({
        error: error
    })
}


exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        let blog
        fields.name = req.profile.name
        fields.id = req.user._id
        err = checkInitalError(err, fields)
        if(err) {return handleError(res, err)} 
        [blog, err] = createBlogWithFields(fields, files)
        if(err) {return handleError(res, err)}
        return saveBlog(res, blog)
    })
}

const checkInitalError = (err , fields) => {
    return err || validateFields(fields)
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
    blog.excerpt = stripHtml(body.substring(0,250)).result+'... '
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

const saveBlog = (res, blog) => {
    blog.save((err, result) => {
        if(err){
            console.log(err)
            return handleError(res, err)
        }
        return res.json(result)
    })  
}


exports.listAllBlogs = (req, res) => {
    Blog.find({})
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username')
    .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
    .exec((err, data) => {
        if(err) {
            return handleError(err)
        }
        res.json(data)
    })
}
exports.listAllBlogsCategoriesTags = (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 10
    let skip = req.body.skip ? parseInt(req.body.skip) : 0

    let blogs
    let categories
    let tags 
    Blog.find({})
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username profile')
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
    .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
    .exec((err, data) => {
        if(err){
            return handleError(err)
        }
        blogs = data
        Category.find({}).exec((err, c) => {
            if(err){
                return handleError(err)
            }
            categories = c
        
            Tag.find({}).exec((err, t) => {
                if(err){
                    return handleError(err)
                }
                tags = t
                return res.json({blogs, categories, tags, size: blogs.length})
            })
        })
        
    })
}



exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    Blog.findOne({slug})
    .populate('categories', '_id name slug')
    .populate('tags', '_id name slug')
    .populate('postedBy', '_id name username profile')
    .select('_id title body slug meta_title meat_desc categories tags postedBy createdAt updatedAt')
    .exec((err, data) => {
        if(err){
            return handleError(err)
        }
        res.json(data)
    })
}
exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    Blog.findOneAndRemove({slug}).exec((err, data) => {
        if (err){
            return handleError(err)
        }
        res.json({
            message: 'blog delete success'
        })
    })
}

exports.update = (req, res) => {
    const slug = req.params.slug.toLowerCase()

    Blog.findOne({slug}).exec((err, oldBlog) => {
        if(err) {return handleError(res, err)}  
        let form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req, (err, fields, files) => {
            let blog
            if(err) {return handleError(res, err)}
            [blog, err] = updateBlogWithFields(oldBlog, fields, files)
            if(err) {return handleError(res, err)}
            return saveBlog(res, blog)
            
        })
    })
}
const updateBlogWithFields = (oldBlog, fields, files) => {
    let slugBeforeMerge = oldBlog.slug
    oldBlog = _.merge(oldBlog, fields)
    oldBlog.slug = slugBeforeMerge

    const {body, categories, tags} = fields

    if(body){
        oldBlog.excerpt = stripHtml(body.substring(0,250)).result+'... ' 
        oldBlog.meta_desc = stripHtml(body.substring(0,160))
    }
    if(categories) {
        oldBlog.categories = categories.split(',')
    }
    if(tags){
        oldBlog.tags = tags.split(',')
    }

    if(files.photo){ 
        if(files.photo.size > 1000000){
            error =  'image could not uploaddd'
        }else{
            oldBlog.photo.data = fs.readFileSync(files.photo.path)
            oldBlog.photo.contentType = files.photo.type
        }
    }
    return [oldBlog, error]
}

exports.photo = (req, res) => {
    const slug = req.params.slug.toLowerCase()
    Blog.findOne({slug})
    .select('photo')
    .exec((err, blog) => {
        if(err || !blog){
            return handleError(res, err)
        }
        res.set('Content-type', blog.photo.contentType)
        return res.send(blog.photo.data)
    })
}