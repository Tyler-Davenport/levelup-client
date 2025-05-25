// pages/events/index.js
import { useEffect, useState } from 'react';
import EventCard from '../../src/components/event/eventCard';
import { getEvents } from '../../src/utils/data/eventData';

function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard description={event.description} date={event.date} time={event.time} game={event.game} organizer={event.organizer} />
        </section>
      ))}
    </article>
  );
}

export default EventsPage;
