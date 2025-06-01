// pages/events/index.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EventCard from '../../src/components/event/eventCard';
import { useAuth } from '../../src/utils/context/authContext';
import { deleteEvent, getEvents } from '../../src/utils/data/eventData';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  // Helper to refresh events
  const refreshEvents = () => {
    if (user?.uid) {
      getEvents(user.uid).then((data) => setEvents(data));
    }
  };

  useEffect(() => {
    refreshEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  return (
    <div>
      <h1>Events</h1>

      <div className="mb-3">
        <Button variant="primary" onClick={() => router.push('/events/new')}>
          Register New Event
        </Button>
      </div>

      {events.map((event) => {
        const eventId = event.id || event.pk;
        // Determine if the current user has joined this event
        const joined = Array.isArray(event.attendees) ? event.attendees.some((att) => att.uid === user?.uid) : false;
        return (
          <section key={`event--${eventId}`} className="event">
            <EventCard id={eventId} description={event.description} date={event.date} time={event.time} game={event.game} organizer={event.organizer} joined={joined} onUpdate={refreshEvents} />
            <Button
              variant="danger"
              className="ms-2"
              onClick={async () => {
                await deleteEvent(eventId);
                refreshEvents();
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
