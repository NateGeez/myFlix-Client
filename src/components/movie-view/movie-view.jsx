import { Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.ImagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
                <p>Bio: {movie.Director.Bio}</p>
                <p>Birth Date: {movie.Director.Birth}</p>
            </div>
            <Button variant="info" onClick={onBackClick}>Back</Button>
        </div>
    );
};