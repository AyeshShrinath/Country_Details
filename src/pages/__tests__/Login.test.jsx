import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { BrowserRouter } from 'react-router-dom';

// Mock the UserContext
jest.mock('../../contexts/UserContext');
import { useUser } from '../../contexts/UserContext';

beforeEach(() => {
  // Mock localStorage
  const mockLocalStorage = {
    getItem: jest.fn((key) => {
      if (key === 'users') {
        return JSON.stringify({
          pawara: { password: '1234', favorites: [] },
        });
      }
      return null;
    }),
    setItem: jest.fn(),
  };
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  });
});

test('calls login with username when form is submitted', () => {
  const mockLogin = jest.fn();
  useUser.mockReturnValue({ login: mockLogin });

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/username/i), {
    target: { value: 'pawara' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: '1234' },
  });

  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  expect(mockLogin).toHaveBeenCalledTimes(1);
  expect(mockLogin).toHaveBeenCalledWith('pawara');
});
