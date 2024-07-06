import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Inception",
            image: 
                "https://m.media-amazon.com/images/I/61cN-XN94TL._AC_UF894,1000_QL80_.jpg",
            description: "A skilled thief who specializes in infiltrating the subconcious minds of his targets to extract valuable information is offered a chance to have his criminal record erased as payment for the implantation of another person's idea into a target's subconscious.",
            genre: "Sci-Fi",
            director: "Christopher Nolan"
        },
        {
            id: 2,
            title: "Forrest Gump",
            image: 
                "https://i.pinimg.com/736x/20/a4/16/20a416ed335a94ed2e535e3ad5def5af.jpg",
            description: "A kind-hearted man with a low IQ who inadvertently influences several historical events in the 20th century United States.  Despite his cognitive limitations, Forrest's life is marked by extraordinary experiences.",
            genre: "drama",
            director: "Robert Zemeckis"
        },
        {
            id: 3,
            title: "Gladiator",
            image: 
                "https://m.media-amazon.com/images/I/61Nj34lqIvL._AC_UF894,1000_QL80_.jpg",
            description: "Maximus Decimus Meridius, a loyal Roman general who is betrayed by Commodus, the ambitious and corrupt son of Emperor Marcus Aurelius.  After his family is murdered and he is sold into slavery, Maximus rises through the ranks of the gladiator arena to seek vengeance against Commodus.",
            genre: "drama",
            director: "Ridley Scott"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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