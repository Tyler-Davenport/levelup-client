import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import GameCard from '../../src/components/game/GameCard';
import { deleteGame, getGames } from '../../src/utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getGames().then((data) => {
      console.log('Games data:', data);
      setGames(data);
    });
  }, []);

  return (
    <article className="games">
      <h1>Games</h1>

      <div className="mb-3">
        <Button
          variant="primary"
          onClick={() => {
            router.push('/games/new');
          }}
        >
          Register New Game
        </Button>
      </div>

      {games.map((game) => {
        // Use id or pk for the game identifier (avoid _id to prevent lint error)
        const gameId = game.id || game.pk;
        return (
          <section key={`game--${gameId}`} className="game">
            <GameCard id={gameId} title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} />
            <Button
              variant="danger"
              className="ms-2"
              onClick={async () => {
                await deleteGame(gameId);
                getGames().then((data) => setGames(data));
              }}
            >
              Delete
            </Button>
          </section>
        );
      })}
    </article>
  );
}

export default Home;
