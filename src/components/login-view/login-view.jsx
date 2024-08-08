import { useState } from "react";
import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch("https://natesmovieflix-742bdbb68d51.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
            if (data.user && data.token) {
                onLoggedIn(data.user, data.token);
            } else {
                alert("Invalid username or password");
            }
        })
        .catch((e) => {
            alert("Something went wrong");
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                <CardGroup>
                    <Card>
                        <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    minLength="3"
                                    placeholder="Enter your Username"
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter you Password"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        </Card.Body>
                    </Card>
                </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};