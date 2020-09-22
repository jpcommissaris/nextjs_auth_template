import fetch from 'isomorphic-fetch'
import {API} from '../config'

export const createBlog = (blog, token) => {
    return fetch(`${API}/blog`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: blog
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err))
}

export const listBlogsWithCategoriesAndTags = () => {
    return fetch(`${API}/blogs-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: {
            limit: 10,
            skip: 0
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err))
}