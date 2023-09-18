import React from 'react';
import {Button, Col, Container, Nav, Navbar, Row} from 'react-bootstrap';
import {makeStyles} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import {routes} from "../../../routes";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));

const NavBar = () => {
    const classes = useStyles();

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>My DAX App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/*<Row>*/}
                            {/*<Col lg={8}>*/}
                                <Nav className="ml-auto">
                                    {routes.map(route => (
                                        <Nav.Link key={route.path} as={RouterLink} to={route.path}>
                                            {route.name}
                                        </Nav.Link>
                                    ))}
                                </Nav>
                            {/*</Col>*/}
                            {/*<Col lg={4}>*/}

                            <Button variant="outline-primary">Trade Now</Button>
                            {/*</Col>*/}
                        {/*</Row>*/}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );

};

export default NavBar;