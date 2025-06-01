import { useAuth } from '@/utils/context/authContext';
import { joinEvent, leaveEvent } from '@/utils/data/eventData';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

function EventCard({ id, description, date, time, game, organizer, joined, onUpdate }) {
  const router = useRouter();
  const { user } = useAuth();

  let organizerName = organizer?.full_name || organizer;
  if (organizer?.uid && user?.uid && organizer.uid === user.uid) {
    organizerName = user.fbUser?.displayName || user.uid;
  }

  const handleJoin = async () => {
    try {
      await joinEvent(id, user.uid);
      onUpdate();
    } catch (err) {
      alert('Failed to join event.');
    }
  };

  const handleLeave = async () => {
    try {
      await leaveEvent(id, user.uid);
      onUpdate();
    } catch (err) {
      alert('Failed to leave event.');
    }
  };

  return (
    <Card className="text-center mb-3">
      <Card.Header>{game.title}</Card.Header>
      <Card.Body>
        <Card.Title>{description}</Card.Title>
        <Card.Text>Organized by: {organizerName}</Card.Text>
        <Card.Text>
          {date} at {time}
        </Card.Text>
        <Button variant="warning" onClick={() => router.push(`/events/${id}/edit`)} className="me-2">
          Edit
        </Button>
        {joined ? (
          <Button variant="danger" onClick={handleLeave}>
            Leave
          </Button>
        ) : (
          <Button variant="success" onClick={handleJoin}>
            Join
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  game: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  organizer: PropTypes.oneOfType([
    PropTypes.shape({
      uid: PropTypes.string,
      full_name: PropTypes.string,
    }),
    PropTypes.string,
  ]).isRequired,
  joined: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
