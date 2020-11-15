import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const adminindex = () => {
    return(
        <Layout>
            <Admin>
                <Container fluid>
                    <Row> 
                        <Col md='12'>
                            <h2>Admin Dashboard</h2> 
                        </Col>
                    </Row>
                </Container>
            </Admin> 
        </Layout>   
    )
}

export default adminindex;