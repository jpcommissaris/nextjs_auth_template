import Link from 'next/link'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'
import {getCookie, isAuth} from '../../actions/auth'
import {getCategories} from '../../actions/category'
import {getTags} from '../../actions/tag'
import {createBlog} from '../../actions/blog'

import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import {QuillModules, QuillFormats} from '../../helpers/quill'
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})


const sideBarStyle={
    maxHeight: '200px',
    overflow: 'scroll',
    marginBottom: '16px'
}


const CreateBlog = () => {
    const blogFromLS = () => {
        if(typeof window !== 'undefined'){
            let blogLS = localStorage.getItem('blog')
            if(blogLS){
                return JSON.parse(blogLS)
            }
        }
        return ''
    }
    const router = useRouter()
    const token = getCookie('token')
    const defaultFormValues= {
        title: '',
        body: blogFromLS(),
        photo: '',
        categories: [],
        tags: [],
    }
    const defaultMessageValue = {type: '', content: ''}
    const [formValues, setFormValues] = useState(defaultFormValues)
    const [message, setMessage] = useState(defaultMessageValue)
    const [allCategories, setAllCategories] = useState([])
    const [allTags, setAllTags] = useState([])

    



    const {title, body, photo, categories, tags} = formValues

    useEffect(() => {
        setFormValues(defaultFormValues)
        initCategories()
        initTags()
    }, [router])

    const initCategories = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error)
                setMessage({type: 'danger', content: data.error})
            }else{
                setAllCategories(data)
            }
        })
    }
    const initTags = () => {
        getTags().then(data => {
            if(data.error){
                setMessage({type: 'danger', content: data.error})
            }else{
                setAllTags(data)
            }
        })
    }

    const showCategories = () => {
        return (
            <ListGroup style={sideBarStyle}>
                {allCategories && allCategories.map((c, i) => {                   
                    let checked = false
                    if(categories.includes(c._id)){
                        checked = true
                    }
                    return (
                        <ListGroup.Item key={i}>
                            <input type='checkbox' className= 'mr-2' checked={checked} onChange={() => handleSelectedCategories(c._id)}/> 
                            <label className="form-check-label">{c.name}</label>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        )
    }
    const showTags = () => {
        return (
            <ListGroup style={sideBarStyle}>
                {allTags && allTags.map((t, i) => {
                    let checked = false
                    if(tags.includes(t._id)){
                        checked = true
                    }
                    return (
                        <ListGroup.Item key={i}>
                            <input type='checkbox' className= 'mr-2' checked={checked} onChange={() => handleSelectedTags(t._id)}/> 
                            <label className="form-check-label">{t.name} </label>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        )
    }

    const handleSelectedCategories = (id) => {
        setMessage(defaultMessageValue)
        const clickedCategory = categories.indexOf(id)
        const selected = [...categories]
        if(clickedCategory == -1){
            selected.push(id)
        }else{
            selected.splice(clickedCategory, 1)
        }
        setFormValues({...formValues, categories: selected})
    }
    
    const handleSelectedTags = (id) => {
        setMessage(defaultMessageValue)
        const clickedTag = tags.indexOf(id)
        const selected = [...tags]
        if(clickedTag == -1){
            selected.push(id)
        }else{
            selected.splice(clickedTag, 1)
        }
        setFormValues({...formValues, tags: selected})
    }

    const featuredImage = () => {
        return (
            <Form.Group>
                <h5>Featued Image</h5>
                <hr/>
                <Form.File 
                    accept="image/*"
                    id="custom-file"
                    label={photo && photo.name || "Upload an image"}
                    onChange={(e) => handleChangeToPhoto(e)} 
                    custom
                />
            </Form.Group>
        )
    }


    const createBlogForm = () => {
        return (
            <Form onSubmit={publishBlog}>
                <Form.Group>
                     <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={title}
                        onChange={(e) => handleChangeToTitle(e)} 
                    /> 
                </Form.Group>
                <Form.Group>
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="Start your blog..."
                        onChange={(text) => {
                            setFormValues({...formValues, body: text})
                            handleChangeToBody(text)
                        }}
                    >

                    </ReactQuill>
                   
                </Form.Group>
                {showMessage()}
                <Form.Group>
                    <Button variant="primary" type="submit">
                        Publish 
                    </Button>
                </Form.Group>
            </Form>
            
        )
    }

    const handleChangeToTitle = e => {
        e.preventDefault() 
        setMessage(defaultMessageValue)
        setFormValues({...formValues, title: e.target.value})
    }

    const handleChangeToPhoto = e => {
        e.preventDefault() 
        setMessage(defaultMessageValue)
        setFormValues({...formValues, photo: e.target.files[0]})
    }

    const handleChangeToBody = text => {
        setMessage(defaultMessageValue)
        if(typeof window !== 'undefined'){
            localStorage.setItem('blog', JSON.stringify(text))
        }
    }

    
    const publishBlog = (e) => {
        e.preventDefault()
        let formData = createFormDataObject()
        makePublishBlogRequest(formData)
    }
    const createFormDataObject = () => {
        let formData = new FormData()
        formData.set('title', title)
        formData.set('body', body)
        formData.set('categories', categories)
        formData.set('tags', tags)
        formData.set('photo', photo)
        return formData
    }
    const makePublishBlogRequest = (formData) => {
        createBlog(formData, token).then(data => {
            if(data.error){
                console.log(data.error)
                setMessage({type: 'danger', content: JSON.stringify(data.error)})
            }else{
                setFormValues({...defaultFormValues})
                setFormValues({...formValues, body: ''})
                handleChangeToBody('')
                setMessage({type: 'success', content: `Create a blog named ${data.title}`})
            }
        })
    }

    const showMessage = () => {
        return (
            <Alert variant={message.type}>
                <p style={{margin: '0px'}}>{message.content}</p>
            </Alert>
        )
    }

    
    

    return (
        <Container fluid>
            <Row>
                <Col md={8}>
                    {createBlogForm()}
                </Col>
                <Col md={4}>
                    {featuredImage()}
                    <h5>Categories</h5>
                    {showCategories()}
                    <h5>Tags</h5>
                    {showTags()}
                </Col>
            </Row>
        </Container>
    )
}


export default CreateBlog