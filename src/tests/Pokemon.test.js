import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('se o nome,peso do pokemon aparece na tela', () => {
  renderWithRouter(<App />);
  expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
  expect(screen.getByText(/average weight: 6\.0 kg/i)).toBeInTheDocument();
});

test('se o pikachu tem o type certo', () => {
  renderWithRouter(<App />);
  const typeId = screen.getByTestId('pokemon-type');
  expect(typeId).toHaveTextContent('Electric');
});

test('se a imagem do pokemon aparece', () => {
  renderWithRouter(<App />);
  const img = screen.getByRole('img', {
    name: /pikachu sprite/i,
  });
  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('se é renderizado o pikachu assim /pokemons/25', () => {
  const { history } = renderWithRouter(<App />);
  const moreDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  expect(moreDetails).toBeInTheDocument();
  userEvent.click(moreDetails);
  expect(history.location.pathname).toBe('/pokemons/25');
});

test('favoritar e ver se aparece a estrela no poke', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const checkbox = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i,
  });
  userEvent.click(checkbox);
  const estrela = screen.getByRole('img', {
    name: /pikachu is marked as favorite/i,
  });
  expect(estrela).toBeInTheDocument();
  expect(estrela.src).toContain('/star-icon.svg');
});
