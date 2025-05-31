import { useAuth } from '@/utils/context/authContext';
import { getSingleGame } from '@/utils/data/gameData';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GameForm from '../../../src/components/game/gameForm';

function EditGamePage() {
  const [game, setGame] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (id && typeof id === 'string' && id !== 'undefined') {
      getSingleGame(id).then(setGame);
    }
  }, [id]);

  return game ? <GameForm user={user} gameObj={game} /> : <p>Loading...</p>;
}

export default EditGamePage;
