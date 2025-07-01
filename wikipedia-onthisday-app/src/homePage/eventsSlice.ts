import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface EventData {
  year: number;
  text: string;
  pages: { title: string; content_urls: { desktop: { page: string } } }[];
}

export interface EventsState {
  events: EventData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  status: 'idle',
  error: null,
};

const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const res = await axios.get(
    `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`
  );
  return res.data.events as EventData[];
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load data';
      });
  },
});

export default eventsSlice.reducer;
