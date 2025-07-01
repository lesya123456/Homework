import {useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchEvents } from './homePage/eventsSlice';
import EventItem from './homePage/EventItem';
import ErrorModal from './homePage/ErrorModal';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const { events, status, error } = useAppSelector(state => state.events);
  const [hideModal, setHideModal] = useState(true);

  useEffect(() => {
    if (status === 'failed') {
      setHideModal(false);
    }
  }, [status]);
 

  const getSortedArray = () => [...events].sort((a, b) => a.year - b.year);

  return (
    <div className="app">
      <h1>Wikipedia: On This Day</h1>
      {(status === 'idle' || status === 'failed') && (
        <button onClick={() => dispatch(fetchEvents())}>Load Events</button>
      )}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <ul className='event_list'>
          {getSortedArray().map((event, index) => (
            <EventItem key={index} event={event} />
          ))}
        </ul>
      )}
      {(status === 'failed' && !hideModal) && <ErrorModal setHideModal={setHideModal} message={error || ''} />}
    </div>
  )
}

export default App
