import type { EventData } from './eventsSlice';

const EventItem = ({ event }: { event: EventData }) => {
  return (
    <li>
      <strong>{event.year}:</strong> {event.text}{' '}
      {event.pages[0] && (
        <a href={event.pages[0].content_urls.desktop.page} target="_blank" rel="noreferrer">
          ({event.pages[0].title})
        </a>
      )}
    </li>
  );
};

export default EventItem;
