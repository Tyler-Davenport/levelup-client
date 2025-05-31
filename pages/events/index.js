// pages/events/index.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EventCard from '../../src/components/event/eventCard';
import { deleteEvent, getEvents } from '../../src/utils/data/eventData';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getEvents().then((data) => {
      console.log('Events data:', data);
      setEvents(data);
    });
  }, []);

  return (
    <div>
      <h1>Events</h1>

      <div className="mb-3">
        <Button variant="primary" onClick={() => router.push('/events/new')}>
          Register New Event
        </Button>
      </div>

      {events.map((event) => {
        // Use id or pk for the event identifier (avoid _id to prevent lint error)
        const eventId = event.id || event.pk;
        return (
          <section key={`event--${eventId}`} className="event">
            <EventCard id={eventId} description={event.description} date={event.date} time={event.time} game={event.game} organizer={event.organizer} />
            <Button
              variant="danger"
              className="ms-2"
              onClick={async () => {
                await deleteEvent(eventId);
                getEvents().then((data) => setEvents(data));
              }}
            >
              Delete
            </Button>
          </section>
        );
      })}
    </div>
  );
}

export default EventsPage;
