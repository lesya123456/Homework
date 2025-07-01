import eventsReducer, { fetchEvents } from './eventsSlice';
import type { EventsState } from './eventsSlice';

describe('eventsSlice', () => {
  const initialState: EventsState = {
    events: [],
    status: 'idle',
    error: null,
  };

  it('should handle fetchEvents.pending action type', () => {
    const action = { type: fetchEvents.pending.type };
    const state = eventsReducer(initialState, action);
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('should handle fetchEvents.fulfilled and set events', () => {
    const fakePayload = [
      { year: 2000, text: 'Event', pages: [] },
      { year: 1900, text: 'Older Event', pages: [] },
    ];
    const action = { type: fetchEvents.fulfilled.type, payload: fakePayload };
    const state = eventsReducer(initialState, action);

    expect(state.status).toBe('succeeded');
    expect(state.events).toEqual(fakePayload);
  });
});
