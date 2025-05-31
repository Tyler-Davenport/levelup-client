import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

function GameForm({ user, gameObj }) {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGameTypes().then(setGameTypes);

    if (gameObj && gameObj.id) {
      setCurrentGame({
        skillLevel: gameObj.skill_level,
        numberOfPlayers: gameObj.number_of_players,
        title: gameObj.title,
        maker: gameObj.maker,
        gameTypeId: gameObj.game_type?.id || gameObj.gameTypeId || 0,
      });
    }
  }, [gameObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameTypeId),
      userId: user.uid,
    };

    if (gameObj?.id) {
      updateGame(game, gameObj.id).then(() => router.push('/games'));
    } else {
      createGame(game).then(() => router.push('/games'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* same form inputs as before */}
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Maker</Form.Label>
        <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Number of Players</Form.Label>
        <Form.Control name="numberOfPlayers" type="number" required value={currentGame.numberOfPlayers} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Skill Level</Form.Label>
        <Form.Control name="skillLevel" type="number" required value={currentGame.skillLevel} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Game Type</Form.Label>
        <Form.Select name="gameTypeId" value={currentGame.gameTypeId} onChange={handleChange}>
          <option value="">Select a game type</option>
          {gameTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        {gameObj?.id ? 'Update' : 'Submit'}
      </Button>
    </Form>
  );
}

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    number_of_players: PropTypes.number,
    skill_level: PropTypes.number,
    game_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    gameTypeId: PropTypes.number,
  }),
};

GameForm.defaultProps = {
  gameObj: null,
};

export default GameForm;
