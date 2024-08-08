import { Button } from "react-bootstrap";
import Image from 'react-bootstrap/Image';

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <Image src={movie.ImagePath} fluid className="m-auto"/>
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
            <Button variant="info" onClick={onBackClick}>Back</Button>
        </div>
    );
};