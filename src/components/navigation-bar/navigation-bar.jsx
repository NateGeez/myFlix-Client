import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    const [expanded, setExpanded] = useState(false);

    const handleSelect = () => {
        setExpanded(false);
    };

    return (
        <Navbar bg="light" expand="lg" expanded={expanded}>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    myFlix App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" onSelect={handleSelect}>
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login" onClick={handleSelect}>
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup" onClick={handleSelect}>
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/" onClick={handleSelect}>
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to={`/users/${user.Username}`} onClick={handleSelect}>
                                    ProfileView
                                </Nav.Link>
                                <Nav.Link onClick={() => { handleSelect(); onLoggedOut(); }}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};