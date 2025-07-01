import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

test('renders button and triggers fetch on click', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const button = screen.getByRole('button', { name: /load events/i });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  expect(await screen.findByText(/loading.../i)).toBeInTheDocument();
});
