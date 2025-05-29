import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent } from '../../utils/data/eventData';

const initialState = {
  description: '',
  date: '',
  time: '',
  gameId: '',
};

function EventForm({ user, games }) {
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      gameId: Number(currentEvent.gameId),
      organizerId: user.uid, // Make sure your backend expects this
    };

    createEvent(event).then(() => router.push('/events'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control name="date" type="date" required value={currentEvent.date} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Time</Form.Label>
        <Form.Control name="time" type="time" required value={currentEvent.time} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Game</Form.Label>
        <Form.Select name="gameId" value={currentEvent.gameId} onChange={handleChange}>
          <option value="">Select a game</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button type="submit">Register Event</Button>
    </Form>
  );
}

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
};

export default EventForm;
