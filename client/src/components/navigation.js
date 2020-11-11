import React, {useState} from 'react';
import {Button, Navbar, Nav, NavDropdown, Form, FormControl} from "react-bootstrap"
import {useDispatch} from "react-redux";
import {logoutUser} from "../actions/authActions";

const Navigation = () => {
    const [name, setName] = useState('');
    const searchURL = '/stylists/search/'
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logoutUser())
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/userLanding">Haircut Uber</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Haircut" id="basic-nav-dropdown">
                            {/*<NavDropdown.Item href="/retail">Overview</NavDropdown.Item>*/}
                            <NavDropdown.Item href={searchURL+'services/Men Haircut'}>Men's Haircut</NavDropdown.Item>
                            <NavDropdown.Item href={searchURL+'services/Women Haircut'}>Women's Haircut</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/editProfile">My Profile</Nav.Link>
                        <Nav.Link href="#">Services</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Form inline>
                    <FormControl
                        onChange={event => setName(event.target.value)}
                        value={name}
                        type="text"
                        placeholder="Stylist"
                        className="mr-sm-2"
                    />
                </Form>
                <a href={`${searchURL}name/${name}`}><Button variant="primary">Search</Button></a>
                <button onClick={onLogout} className="btn btn-warning mx-2">Logout</button>
            </Navbar>
        </div>
    );
};

export default Navigation;