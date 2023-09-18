import React from 'react';
import { Nav, NavLink } from 'react-bootstrap';

const Menu = ({ routes }) => {
    return (
        <Nav className="mr-auto">
            {routes.map((route, index) => (
                <Nav.Item key={index}>
                    <NavLink to={route.path}>{route.element.type.name}</NavLink>
                </Nav.Item>
            ))}
        </Nav>
    );
};

export default Menu;
