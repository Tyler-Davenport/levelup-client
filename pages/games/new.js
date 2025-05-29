import GameForm from '../../src/components/game/gameForm';
import { useAuth } from '../../src/utils/context/authContext';

function NewGame() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Register New Game</h2>
      <GameForm user={user} />
    </div>
  );
}

export default NewGame;
