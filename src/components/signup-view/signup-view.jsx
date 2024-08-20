import { useState } from "react";
import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";

export const SignupView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://natesmovieflix-742bdbb68d51.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                loginUser(username, password);
            } else {
                alert("Signup failed");
            }
        });
    };

    const loginUser = (username, password) => {
        fetch("https://natesmovieflix-742bdbb68d51.herokuapp.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Username: username, Password: password })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.user && data.token) {
                    onLoggedIn(data.user, data.token);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                } else {
                    alert("Login failed");
                }
            });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Sign Up!</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            minLength="3"
                                            placeholder="Enter a Username"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Enter a Password"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Enter your Email"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={birthday}
                                            onChange={(e) => setBirthday(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Button variant="info" type="submit">Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};