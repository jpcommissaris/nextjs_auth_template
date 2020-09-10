import fetch from 'isomorphic-fetch'
import {API} from '../config'
import slugify from 'slugify'

export const createCategory = (category, token) => {
    return fetch(`${API}/category`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category)
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err))
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET',
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err))
}
export const singleCategory = (slug) => {
    return fetch(`${API}/category/${slug}`, {
        method: 'GET',
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err))
}

export const removeCategory = (name, token) => {
    const slug = slugify(name).toLowerCase()
    return fetch(`${API}/category/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err))
}