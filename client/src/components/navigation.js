import React from 'react';
import {Navbar, Nav, NavDropdown} from "react-bootstrap"

const Navigation = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
<<<<<<< HEAD
                <Navbar.Brand href="/">Ultimate Style</Navbar.Brand>
=======
                <Navbar.Brand href="/userLanding">Haircut Uber</Navbar.Brand>
>>>>>>> a5e3010b7a2498a558e372825e4c23df8fa698d2
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Haircut" id="basic-nav-dropdown">
                            {/*<NavDropdown.Item href="/retail">Overview</NavDropdown.Item>*/}
                            <NavDropdown.Item href="#">Men's Haircut</NavDropdown.Item>
                            <NavDropdown.Item href="#">Women's Haircut</NavDropdown.Item>
                            <NavDropdown.Item href="#">Products</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/stylist/profile">My Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand href="/">Ultimate Style</Navbar.Brand>
            </Navbar>
        </div>
    );
};

export default Navigation;