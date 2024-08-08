import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text><strong>Director:</strong> {movie.Director.Name}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="info">
                    Open
                </Button>
            </Card.Body>            
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired
    }).isRequired, 
    onMovieClick: PropTypes.func.isRequired
};