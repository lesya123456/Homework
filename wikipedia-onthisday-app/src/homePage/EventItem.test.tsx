import { render, screen } from '@testing-library/react';
import EventItem from './EventItem';
import type { EventData } from './eventsSlice';

const mockEvent: EventData = {
  year: 2001,
  text: 'Wikipedia launched',
  pages: [
    {
      title: 'Wikipedia',
      content_urls: {
        desktop: { page: 'https://en.wikipedia.org/wiki/Wikipedia' },
      },
    },
  ],
};

test('renders EventItem with correct content', () => {
  render(<EventItem event={mockEvent} />);
  expect(screen.getByText(/2001:/)).toBeInTheDocument();
  expect(screen.getByText(/Wikipedia launched/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Wikipedia/i })).toBeInTheDocument();
});
