import {useState} from "react";
import {Link} from "react-router-dom";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {ReactComponent as LogoSm} from "../../assets/images/logo.svg";
import {useAuth} from "../Auth";
import routes from "../../routes";
import MetamaskConnect from "../Web3/MetaMask";

const LoginButton = ({isLoggedIn}) => {
    return (<div className="ml-auto">
            {!isLoggedIn && (<Button className="btn pp-hover-icon" role="button">
                    <Link to="/login">Login</Link>
                </Button>)}
        </div>);
};

const HomeButton = ({isAuthenticated}) => {
    return (<div className="ml-auto">
            {isAuthenticated && (<Button className="btn pp-hover-icon" role="button">
                    <Link to="/">Home</Link>
                </Button>)}
        </div>);
};

const MenuItems = ({routes}) => {
    return (<NavDropdown title="Dropdown" id="basic-nav-dropdown">
            {routes.map(({path, title}, index) => (<NavDropdown.Item as={Link} to={path} key={index}>
                    {title}
                </NavDropdown.Item>))}
            <NavDropdown.Divider/>
        </NavDropdown>);
};


const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const {isLoggedIn, user} = useAuth();

    const toggleExpanded = () => {
        setExpanded((prevState) => !prevState);
    };

    return (<Navbar
            bg="light"
            variant="light"
            expand="lg"
            sticky="top"
            expanded={expanded}
        >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <LogoSm
                        className="logo"
                        style={{maxHeight: "3em", width: "auto"}}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" onClick={toggleExpanded}/>
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <MenuItems routes={routes}/>
                    </Nav>
                    <MetamaskConnect/>
                    <LoginButton isLoggedIn={isLoggedIn}/>
                    <HomeButton isAuthenticated={user.isAuthenticated}/>
                </Navbar.Collapse>
            </Container>
        </Navbar>);
};

export default Header;
