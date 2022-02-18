import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testando o App ', () => {
  test('ter links `Home` About e `Favorite Pokémons`', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();

    userEvent.click(linkHome);
    expect(history.location.pathname).toBe(('/'));
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe(('/about'));

    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe(('/favorites'));
    history.push('/ssss');
    const pageNotFound = screen.getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
