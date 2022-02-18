/* test about About Pokédex */
import { screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<About />);
});

describe('testando o About ', () => {
  test('ter o h2 com o texto About Pokédex ', () => {
    const aboutPoke = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutPoke).toBeInTheDocument();
  });
  test('se contem a imagem `https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`.', () => {
    const image = screen.getByAltText('Pokédex');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  test('se contem dois paragrafos ', () => {
    const textPokemon = screen.getByText(/application simulates/i);
    expect(textPokemon).toBeInTheDocument();
    const textPokemon2 = screen.getByText(/for each one of them/i);
    expect(textPokemon).toBeInTheDocument();
    expect(textPokemon2).toBeInTheDocument();
  });
});
