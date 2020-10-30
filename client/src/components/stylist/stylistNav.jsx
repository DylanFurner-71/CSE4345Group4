import React from 'react';
import {Row, Col, Container} from "react-bootstrap"
import {Navbar, Nav, NavDropdown} from "react-bootstrap"
import {StylistCalendar} from "./stylistCalendar";
import {StylistCard} from "./StylistCard";
export const StylistNav = (props) =>
<>
    <Container fluid>
    <Row>
    <Col><StylistCard url={"/appointments/upcoming/"} info={"Upcoming Appointments"}/></Col>
    <Col><StylistCard url={"/appointments/past/"} info={"Past Appointments"}/></Col>
    </Row>
    <Row>
    <Col><StylistCard url={"/stylist/StylistCalendar/"} info={"Calendar"}/></Col>
    <Col><StylistCard url={"/services/stylistIDsomeday/"} info={"Services Offered"}/></Col>
    </Row>
</Container>
            {/* <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/home">{props.stylistName}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/appointments/upcoming">Upcoming Appointments</Nav.Link>
                        <Nav.Link href="/appointments/past">Past Appointments</Nav.Link>
                        <Nav.Link href="/services/stylistIDsomeday">Services Offered</Nav.Link>
                        <Nav.Link href="/stylist/stylistCalendar">Calendar </Nav.Link>
                        <Nav.Link href="/home">TBD</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar> */}
        </>


