import { render, screen } from '@testing-library/react';
import App from './App';

test('renders link to repo', () => {
  render(<App />);
  const linkElement = screen.getByText(/project repo/i);
  expect(linkElement).toBeInTheDocument();
});
