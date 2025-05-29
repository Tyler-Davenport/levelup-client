import { useEffect, useState } from 'react';
import EventForm from '../../src/components/event/EventForm';
import { useAuth } from '../../src/utils/context/authContext';
import { getGames } from '../../src/utils/data/gameData';

function NewEventPage() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  return (
    <div>
      <h2>Register New Event</h2>
      <EventForm user={user} games={games} />
    </div>
  );
}

export default NewEventPage;
