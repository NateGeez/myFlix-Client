import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://natesmovieflix-742bdbb68d51.herokuapp.com/movies")
            .then((response) => {
                if (response.headers.get("content-type")?.includes("application/json")) {
                    return response.json();
                } else {
                    throw new Error("Response was not JSON");
                }
            })
            .then((data) => {
                if (!data || !Array.isArray(data)) {
                    throw new Error('Invalid data format');
                }

                const moviesFromApi = data.map((doc) => ({
                    id: doc._id,
                    title: doc.Title,
                    director: doc.Director?.Name,
                }));

                setMovies(moviesFromApi);
            })
            .catch((err) => {
                console.error('Fetch error:', err);
                setError(err.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(movie);
                    }}
                />
            ))}
        </div>
    );
};