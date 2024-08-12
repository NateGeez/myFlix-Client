import { Button, Card, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, movies }) => {
    const [username, setUsername] = useState(user.Username);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [password, setPassword] = useState('');
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const formattedBirthday = new Date(birthday).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    useEffect(() => {
        const favoriteMovieList = movies.filter((movie) =>
            user.FavoriteMovies.includes(movie.Title)
        );
        setFavoriteMovies(favoriteMovieList);
    }, [user, movies]);

    const handleRemoveFromFavorites = () => {
        const token = localStorage.getItem('token');
        fetch(`https://natesmovieflix-742bdbb68d51.herokuapp.com/users/${user.Username}/movies/${Title}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    setIsFavorite(false);
                    console.log("Movie removed from favorites");
                } else {
                    console.error("Failed to remove movie from favorites", response.statusText);
                }
            })
            .catch(error => {
                console.error("Error removing movie from favorites:", error);
            });
    };

    const handleUpdate = () => {
        const token = localStorage.getItem('token');
        fetch(`https://natesmovieflix-742bdbb68d51.herokuapp.com/users/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                Username: username,
                Email: email,
                Birthday: birthday,
                Password: password
            })
        })
            .then(response => response.json())
            .then(updatedUser => {
                console.log("Profile updated:", updatedUser);
            })
            .catch(error => {
                console.error("Error updating profile:", error);
            });
    };

    const handleDeleteAccount = () => {
        const token = localStorage.getItem('token');
        fetch(`https://natesmovieflix-742bdbb68d51.herokuapp.com/users/${username}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log("Account deleted");
                    localStorage.removeItem('token');
                    window.location.herf = '/';
                } else {
                    console.error("Failed to delete account");
                }
            })
            .catch(error => {
                console.error("Error deleting account:", error);
            });
    };

    return (
        <div>
            <h2>Profile</h2>
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBirthday">
                    <Form.Label>
                        Birthday:
                        <span className="text-muted"> ({formattedBirthday})</span>
                    </Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter a new password"
                    />
                </Form.Group>

                <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={handleUpdate}>
                        Update Profile
                    </Button>
                    <Button variant="danger" onClick={handleDeleteAccount} className="ml-2">
                        Delete Account
                    </Button>
                </div>
            </Form>

            <h3 className="mt-4">Favorite Movies</h3>
            <div className="d-flex flex-wrap">
                {favoriteMovies.length > 0 ? (
                    favoriteMovies.map((movie) => (
                        <Card key={movie._id} style={{ width: '18rem' }} className="m-2">
                            <Card.Img variant="top" src={movie.ImagePath} />
                            <Card.Body>
                                <Card.Title>{movie.Title}</Card.Title>
                                <Link to={`/movies/${movie._id}`}>
                                    <Button variant="info" className="mr-2">View Details</Button>
                                    <Button variant="danger" onClick={() => handleRemoveFromFavorites(movie._id)}>
                                        Remove
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No favorite movies yet.</p>
                )}
            </div>
        </div>
    );

};