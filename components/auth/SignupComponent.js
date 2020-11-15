import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useState, useEffect} from 'react'
import {signup, isAuth} from '../../actions/auth'
import useRouter from 'next/router'

const SignupComponent = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '', 
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })
    const {name, email, password, error, loading, message, showForm} = formValues

    useEffect(() => {
        isAuth() && useRouter.push('/')
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormValues({...formValues, loading: true, error: false})
        const user = {name, email, password}
        signup(user)
        .then(data => {
            if(data.error){
                setFormValues({...formValues, error: data.error})
            }else{
                setFormValues({...formValues,  
                    name: '',
                    email: '', 
                    password: '',
                    error: '',
                    message: data.message,
                    loading: false,
                    showForm: false
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

    const signupForm = () => {
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
                    <Form.Text className="text-muted" >
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                        value={name} 
                        type="text" 
                        placeholder="Enter name" 
                        onChange={handleChange('name')} 
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
                    Submit
                </Button>
            </Form>
        )
    }

    return (
        <React.Fragment>

            {showMessage()}
            {showForm && signupForm()}
            {showError()}
            {showLoading()}
            
        </React.Fragment>
    )
}
export default SignupComponent