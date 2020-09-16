import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin'
import Link from 'next/link'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

const adminindex = () => {
    return(
        <Layout>
            <Admin>
                <Container fluid>
                    <Row> 
                        <Col md='12'>
                            <h2>Admin Dashboard</h2> 
                        </Col>
                        <Col md='4'>
                            <ListGroup>
                                <Link href="admin/crud/category-tag">
                                    <ListGroup.Item action href="#"> Manage Categories/Tags</ListGroup.Item>
                                </Link>
                                <Link href="admin/crud/blog">
                                    <ListGroup.Item action href="#"> Create Blog</ListGroup.Item>
                                </Link>
                            </ListGroup>
                        </Col>
                        <Col md='8'>
                            right
                        </Col>
                    </Row>
                </Container>

            </Admin> 
        </Layout>   
    )
}

export default adminindex;