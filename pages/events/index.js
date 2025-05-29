// pages/events/index.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EventCard from '../../src/components/event/eventCard';
import { getEvents } from '../../src/utils/data/eventData';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <div>
      <h1>Events</h1>

      <div className="mb-3">
        <Button variant="primary" onClick={() => router.push('/events/new')}>
          Register New Event
        </Button>
      </div>

      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard description={event.description} date={event.date} time={event.time} game={event.game} organizer={event.organizer} />
        </section>
      ))}
    </div>
  );
}

export default EventsPage;
