import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useState, useEffect} from 'react'
import {signin, authenticate, isAuth} from '../../actions/auth'
import Router from 'next/router';

const SigninComponent = () => {
    const [formValues, setFormValues] = useState({
        email: '', 
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })
    const {email, password, error, loading, message, showForm} = formValues

    useEffect(() => {
        isAuth() && Router.push('/')
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormValues({...formValues, loading: true, error: false})
        const user = {email, password}
        signin(user)
        .then(data => {
            if(data.error){
                setFormValues({...formValues, error: data.error})
            }else{
                // save user token to cookie
                // save user info to localstorage
                authenticate(data, () => {
                    Router.push(`/`)
                })
            }
            
        })
        console.log(formValues.error)
    }
    const handleChange = arg => e => {
        setFormValues({
            ...formValues,
            error: false,
            [arg]: e.target.value
        })
    }
    const showLoading = () => loading ? <div className='alert alert-info'> Loading...</div> : '' 
    const showError = () => error ? <div className='alert alert-danger'>{error}</div> : ''
    const showMessage= () => message ? <div className='alert alert-info'> {message}</div> : ''

    const signinForm = () => {
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        value={email} 
                        type="email" 
                        placeholder="Enter email"
                        onChange={handleChange('email')} 
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        value={password} 
                        type="password" 
                        placeholder="Password" 
                        onChange={handleChange('password')} 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        )
    }

    return (
        <React.Fragment>

            {showMessage()}
            {showForm && signinForm()}
            {showError()}
            {showLoading()}
            
        </React.Fragment>
    )
}
export default SigninComponent