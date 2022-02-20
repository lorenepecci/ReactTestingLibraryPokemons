import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('testando o App ', () => {
  test('nao ter nenhum favorito imprime no favorites found`', () => {
    renderWithRouter(<FavoritePokemons />);
    const textNotFound = screen.getByText(/no favorite pokemon found/i);
    expect(textNotFound).toBeInTheDocument();
  });

  test('testando se o card favorito aparece ', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checkbox);
    history.push('/favorites');
    const text = screen.getByText(/More details/i);
    expect(text).toBeInTheDocument();
  });
  /* ir na home, clicar no link more details, clicar no ckeckbox com o text pokemom favoritado
  mudar pra page favorites , identificar o link more detatails  */
});
