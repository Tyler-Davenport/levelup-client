// src/components/game/GameCard.js
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

function GameCard({ id, title, maker, numberOfPlayers, skillLevel }) {
  const router = useRouter();

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">By {maker}</Card.Subtitle>
        <Card.Text>
          <strong>Players:</strong> {numberOfPlayers} <br />
          <strong>Skill Level:</strong> {skillLevel}
        </Card.Text>
        <Button variant="outline-primary" onClick={() => router.push(`/games/${id}/edit`)}>
          Edit Game
        </Button>
      </Card.Body>
    </Card>
  );
}

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
};

export default GameCard;
