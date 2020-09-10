import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'

import Category from '../../../components/crud/category'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const categorytag = () => {
    return(
        <Layout>
            <Admin>
                <Container fluid>
                    <Row> 
                        <Col md='12'>
                            <h2>Manage Categories and Tags</h2> 
                        </Col>
                        <Col md='4'>
                            <p>Create Categories</p>
                            <Category />
                        </Col>
                        <Col md='8'>
                            <p>tag</p>
                        </Col>
                    </Row>
                </Container>
            </Admin> 
        </Layout>   
    )
}

export default categorytag;