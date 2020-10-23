import React from 'react';
import {Navbar, Nav, NavDropdown} from "react-bootstrap"

const Navigation = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Haircut Uber</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Haircut" id="basic-nav-dropdown">
                            {/*<NavDropdown.Item href="/retail">Overview</NavDropdown.Item>*/}
                            <NavDropdown.Item href="#">Men's Haircut</NavDropdown.Item>
                            <NavDropdown.Item href="#">Women's Haircut</NavDropdown.Item>
                            <NavDropdown.Item href="#">Products</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/profile">My Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navigation;