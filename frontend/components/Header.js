import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import {APP_NAME, API} from '../config.js'
import Link from 'next/link'
import {signout, isAuth} from '../actions/auth'
import { Router } from 'next/router';


const style = {
    width: '100%',
    height: '50px',
    padding: '16px',
} 


function Header(props) {
    
    const UILoginState = () => {
        const user = false
        if(isAuth()){
            return(
                <NavDropdown
                    title={user.name}
                >
                    <NavDropdown.Item 
                        className="text-danger" 
                        href= "/" 
                        onClick={() => signout(() => Router.replace('/'))}
                    > 
                        Logout 
                    </NavDropdown.Item>
                </NavDropdown>
            )
        }else{
            return ( 
                <NavDropdown title="logon">
                    <Link href="/signin">
                        <NavDropdown.Item className="text-danger" href= {'/signin'} > Login </NavDropdown.Item>
                    </Link>
                    <Link href="/signup">
                        <NavDropdown.Item className="text-danger" href= {'/signup'} > create account </NavDropdown.Item>
                    </Link>
                </NavDropdown> 
            )
        }
    }
    
    return (
        <Navbar variant= "dark" bg="dark" expand="sm" style={style}>
            <Link href="/">
                <Navbar.Brand href='/'>{APP_NAME}</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link href="/">
                        <Nav.Link href="/"> home </Nav.Link>
                    </Link>
                </Nav> 
                <Nav>
                    {UILoginState()}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    
    )
}
export default Header



