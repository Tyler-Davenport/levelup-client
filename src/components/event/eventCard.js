import { useAuth } from '@/utils/context/authContext';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

function EventCard({ id, description, date, time, game, organizer }) {
  const router = useRouter();
  const { user } = useAuth();

  // If the organizer is the logged-in user, show their display name from auth context
  let organizerName = organizer?.full_name || organizer;
  if (organizer?.uid && user?.uid && organizer.uid === user.uid) {
    organizerName = user.fbUser?.displayName || user.uid;
  }

  return (
    <Card className="text-center mb-3">
      <Card.Header>{game.title}</Card.Header>
      <Card.Body>
        <Card.Title>{description}</Card.Title>
        <Card.Text>Organized by: {organizerName}</Card.Text>
        <Card.Text>
          {date} at {time}
        </Card.Text>
        <Button variant="warning" onClick={() => router.push(`/events/${id}/edit`)}>
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired, // ✅ Required for navigation
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
};

export default EventCard;
