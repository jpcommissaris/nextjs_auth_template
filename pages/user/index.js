import Layout from '../../components/Layout'
import Private from '../../components/auth/Private'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



const userindex = () => {
    return(
        <Layout>
            <Private>
                <h2>User Dashboard</h2>
            </Private>
        </Layout>   
    )
}

export default userindex;