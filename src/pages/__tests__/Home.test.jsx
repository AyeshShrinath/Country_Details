import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import Home from '../Home';
import { BrowserRouter } from 'react-router-dom';
import * as api from '../../services/api';

jest.mock('../../contexts/UserContext', () => ({
    useUser: () => ({
      user: { username: 'testuser' },
      logout: jest.fn(),
    }),
  }));
  

const mockData = [
  {
    cca3: 'IND',
    name: { common: 'India' },
    capital: ['New Delhi'],
    region: 'Asia',
    population: 1400000000,
    flags: { png: 'https://flagcdn.com/w320/in.png' }
  }
];

jest.spyOn(api, 'getAllCountries').mockResolvedValue(mockData);

test('loads and displays countries', async () => {
    jest.mock('../../contexts/UserContext', () => ({
        useUser: () => ({
          user: { username: 'testuser' },
          logout: jest.fn(),
        }),
      }));
      
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('India')).toBeInTheDocument();
  });
});
