// pages/events/[id]/edit.js
import EventForm from '@/components/event/EventForm';
import { useAuth } from '@/utils/context/authContext';
import { getSingleEvent } from '@/utils/data/eventData';
import { getGames } from '@/utils/data/gameData';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditEventPage() {
  const [games, setGames] = useState([]);
  const [event, setEvent] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getGames().then(setGames);
    if (id && typeof id === 'string' && id !== 'undefined') {
      getSingleEvent(id).then(setEvent);
    }
  }, [id]);

  return event ? <EventForm user={user} games={games} eventObj={event} /> : <p>Loading...</p>;
}
