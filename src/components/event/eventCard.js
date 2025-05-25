// components/event/EventCard.js
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function EventCard({ description, date, time, game, organizer }) {
  return (
    <Card className="text-center mb-3">
      <Card.Header>{game.title}</Card.Header>
      <Card.Body>
        <Card.Title>{description}</Card.Title>
        <Card.Text>Organized by: {organizer?.full_name}</Card.Text>
        <Card.Text>
          {date} at {time}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  game: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  organizer: PropTypes.shape({
    full_name: PropTypes.string,
  }).isRequired,
};

export default EventCard;
