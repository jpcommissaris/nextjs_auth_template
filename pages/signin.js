import Layout from '../components/Layout'
import SigninComponent from '../components/auth/SigninComponent'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/row'
import Col from 'react-bootstrap/col'

const signin = () => {
    return(
        <Layout>
            
            <Container>
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <h2 className='text-center pt-5 pb-3'>Signin </h2>
                        <SigninComponent /> 
                    </Col>
                </Row>
            </Container>
           
        </Layout>   
    )
}

export default signin;