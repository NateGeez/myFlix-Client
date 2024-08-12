import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Image } from "react-bootstrap";

export const MovieView = ({ movies, user }) => {
    const { Title } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        console.log('Movies:', movies); // Debugging
        console.log('Title from useParams:', Title); // Debugging

        if (movies.length > 0 && Title) {
            const foundMovie = movies.find((m) => m._id === Title);
            console.log('Found Movie:', foundMovie); // Debugging
            setMovie(foundMovie);
            if (user) {
                setIsFavorite(user.FavoriteMovies.includes(Title));
            }
        }
    }, [movies, Title, user]);

    const handleAddToFavorites = () => {
        const token = localStorage.getItem('token');

        if (!user || !user.Username || !Title) {
            console.error("User, Title, or token is not defined");
            return;
        }

        fetch(`https://natesmovieflix-742bdbb68d51.herokuapp.com/users/${user.Username}/movies/${Title}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    setIsFavorite(true);
                    console.log("Movie added to favorites");
                } else {
                    console.error("Failed to add movie to favorites", response.statusText);
                }
            })
            .catch(error => {
                console.error("Error adding movie to favorites:", error);
            });
    };

    if (!movie) return <div>Loading movie...</div>;

    return (
        <div>
            <div>
                <Image src={movie.ImagePath} fluid className="m-auto" />
            </div>
            <div>
                <span className="text-md">Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span className="text-md">Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span className="text-md">Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
                <p>Bio: {movie.Director.Bio}</p>
                <p>Birth Date: {movie.Director.Birth}</p>
            </div>
            <Link to={`/`}>
                <Button variant="info">Back</Button>
            </Link>
            {!isFavorite ? (
                <Button variant="primary" onClick={handleAddToFavorites}>
                    Add to Favorites
                </Button>
            ) : (
                <Button variant="secondary" disabled>
                    Added to Favorites
                </Button>
            )}
        </div>
    );
};
