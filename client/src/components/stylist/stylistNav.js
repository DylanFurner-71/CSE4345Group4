import React from 'react';
import {Navbar, Nav, NavDropdown} from "react-bootstrap"
import {StylistCalendar} from "./stylistCalendar";
const StylistNav = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/home">Haircut Uber</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/register">Upcoming Appointments</Nav.Link>
                        <Nav.Link href="/register">Past Appointments</Nav.Link>
                        <Nav.Link href="/register">Services Offered</Nav.Link>
                        <Nav.Link href="/stylist/Calendar">Calendar </Nav.Link>
                        <Nav.Link href="/register">TBD</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default StylistNav;