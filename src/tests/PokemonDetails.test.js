import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  const { history } = renderWithRouter(<App />);
  history.push('/pokemons/25');
});

describe('se aparece as informações detalhadas do Pokémon.', () => {
  test('um texto `<name> Details`', () => {
    const titulo = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(titulo).toBeInTheDocument();
  });
  test('**Não** deve existir o link moreDetails', () => {
    const moreDetails = screen.queryByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toBeNull();
  });
  test('deve ter um heading `h2` com o texto `Summary`', () => {
    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
  });

  test('deve conter o resumo do pokemon ', () => {
    const resumo = screen.getByText(
      /make them tender enough to eat\./i,
    );
    expect(resumo).toBeInTheDocument();
  });
});

describe('mapas contendo as localizações do pokémon', () => {
  test('heading `h2` com o texto `Game Locations of <name>`', () => {
    const tituloLoc = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(tituloLoc).toBeInTheDocument();
  });
  test('localizações do Pokémon devem estar seção de detalhes', () => { });
  test('deve ter o nome da localização e imagem do mapa', () => {
    const nomeLoc0 = screen.getByText(/kanto viridian forest/i);
    expect(nomeLoc0).toBeInTheDocument();
    const localizacoes = screen.getAllByAltText(/pikachu location/i);
    expect(localizacoes[0]).toBeInTheDocument();
    expect(localizacoes[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    const nomeLoc1 = screen.getByText(/kanto power plant/i);
    expect(nomeLoc1).toBeInTheDocument();
    expect(localizacoes[1]).toBeInTheDocument();
    expect(localizacoes[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});

describe('favoritar um pokémon através da página de detalhes', () => {
  test('favoritar', () => {
    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
