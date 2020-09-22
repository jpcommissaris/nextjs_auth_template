import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import NProgress from 'nprogress'
import {APP_NAME} from '../config.js'
import Link from 'next/link'
import {signout, isAuth} from '../actions/auth'
import { useRouter, Router } from 'next/router';
import {useState, useEffect} from 'react'


const style = {
    width: '100%',
    height: '50px',
    padding: '16px',
} 



function Header(props) {
    const router = useRouter()
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        if(isAuth()){
            setAuth(isAuth())
        }else{
            setAuth(false)
        }
    }, [])

    
    const authLink = () => {
        if(auth){
            return(
                <NavDropdown
                    title={auth.name}
                    alignRight
                    
                >
                    <NavDropdown.Item 
                        className="text-danger" 
                        onClick={() => signout(() => {
                            router.reload('/')
                            //router.replace('/')
                            //setAuth(false)
                        })}
                    > 
                        Logout 
                    </NavDropdown.Item>
                </NavDropdown>
            )
        }else{
            return ( 
                <NavDropdown title={'logon'} alignRight>
                    <Link href="/signin">
                        <NavDropdown.Item  className="text-info" href= {'/signin'} > login </NavDropdown.Item>
                    </Link>
                    <Link href="/signup">
                        <NavDropdown.Item  className="text-info" href= {'/signup'} > create account </NavDropdown.Item>
                    </Link>
                </NavDropdown> 
            )
        }
    }

    const dashboardLink = () => {
        if(auth){
            const link = auth.role===1 ? '/admin' : '/user'
            return(
                <React.Fragment>
                    <Link href={link}>
                        <Nav.Link href={link}> dashboard </Nav.Link>
                    </Link>
                </React.Fragment>
            )
        }
    }
    const blogsLink = () => {
        let link = '/blogs' 
        return(
            <React.Fragment>
                <Link href={link}>
                    <Nav.Link href={link}> blogs </Nav.Link>
                </Link>
            </React.Fragment>
        )
    }
    
    return (
        <Navbar variant= "dark" bg="dark" expand="sm" style={style}>
            <Link href="/">
                <Navbar.Brand href='/'>{APP_NAME}</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {blogsLink()}
                    {dashboardLink()}
                </Nav> 
                <Nav>
                    {authLink()}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    
    )
}
export default Header



