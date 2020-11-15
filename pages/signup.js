import Layout from '../components/Layout'
import SignupComponent from '../components/auth/SignupComponent'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/row'
import Col from 'react-bootstrap/col'

const signup = () => {
    return(
        <Layout>
            
            <Container>
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <h2 className='text-center pt-5 pb-3'>Signup </h2>
                        <SignupComponent /> 
                    </Col>
                </Row>
            </Container>
           
        </Layout>   
    )
}

export default signup;