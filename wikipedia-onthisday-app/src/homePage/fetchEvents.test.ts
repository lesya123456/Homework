import { fetchEvents } from './eventsSlice';
import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('fetchEvents thunk', () => {
  it('dispatches fulfilled when request succeeds', async () => {
    const mockData = {
      events: [{ year: 2000, text: 'Test event', pages: [] }],
    };
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    mock.onGet(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`)
      .reply(200, mockData);

    const store = configureStore({
      reducer: { events: eventsReducer },
    });

    await store.dispatch(fetchEvents());

    const state = store.getState().events;
    expect(state.status).toBe('succeeded');
    expect(state.events.length).toBe(1);
  });
});
