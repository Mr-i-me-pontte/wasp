import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ReactComponent as LogoSm } from "../../assets/images/logo.svg";
import { useAuth } from "../Auth";
import "./style.scss";
import routes from "../../routes";
import MetamaskConnect from "../Web3/MetaMask";
const LoginButton = ({ isLoggedIn }) => {
    return (
        isLoggedIn && (
            <div className="ml-auto">
                <Button className="btn pp-hover-icon" role="button">
                    <Link to="/jobs/new">Login</Link>
                </Button>
            </div>
        )
    );
};
const HomeButton = ({ isAuthenticated }) => {
    return (
        <div className="ml-auto">
            {isAuthenticated && (
                <Button className="btn pp-hover-icon" role="button">
                    <Link to="/">Home</Link>
                </Button>
            )}
        </div>
    );
};

const MenuItems = ({ routes }) => {
    return (
        <>
            {routes.map(({ path, name }, index) => (
                <Nav.Item key={index}>
                    <Nav.Link as={Link} to={path}>
                        {name}
                    </Nav.Link>
                </Nav.Item>
            ))}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
        </>
    );
};

const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const { isLoggedIn, user } = useAuth();

    const toggleExpanded = () => {
        setExpanded((prevState) => !prevState);
    };

    return (
        <Col>
            <Navbar className="header" expand="lg" expanded={expanded}>
                <Container fluid>
                    <Navbar.Brand>
                        <Link to="/">
                            <LogoSm
                                className="logo"
                                style={{ maxHeight: "3em", width: "auto" }}
                            />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="navbar-nav"
                        onClick={toggleExpanded}
                    />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Menu" id="basic-nav-dropdown">
                                <MenuItems routes={routes} />
                            </NavDropdown>
                        </Nav>
                        <MetamaskConnect />
                        <LoginButton isLoggedIn={isLoggedIn} />
                        <HomeButton isAuthenticated={user.isAuthenticated} />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Col>
    );
};

export default Header;
