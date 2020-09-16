import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'

import Category from '../../../components/crud/category'
import Tag from '../../../components/crud/tag'

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
                        <Col md='6'>
                            <p>Modify Categories</p>
                            <Category />
                        </Col>
                        <Col md='6'>
                            <p>Modify Tags</p>
                            <Tag />
                        </Col>
                    </Row>
                </Container>
            </Admin> 
        </Layout>   
    )
}

export default categorytag;