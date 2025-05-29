import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import GameCard from '../../src/components/game/GameCard';
import { getGames } from '../../src/utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getGames().then((data) => setGames(data));
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

      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} />
        </section>
      ))}
    </article>
  );
}

export default Home;
