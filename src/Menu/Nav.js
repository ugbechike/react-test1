import React from 'react';
import {
    Nav,
    Navbar,
    Col,
    Form,
    FormControl,
    Button,
    Container
} from 'react-bootstrap';

export default function () {
    return (
        <Navbar fixed="top" bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Ascii</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}