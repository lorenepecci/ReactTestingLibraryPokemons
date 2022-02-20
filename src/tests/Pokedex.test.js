import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const funcaoListaTypesNames = () => {
  const listNames = [];
  pokemons.forEach((item) => {
    listNames.push(item.name);
  });
  return listNames;
};

const funcaoListaTypes = () => {
  const listTypes = [];
  pokemons.forEach((item) => {
    if (!listTypes || !listTypes.includes(item.type)) {
      listTypes.push(item.type);
    }
  });
  return listTypes;
};

beforeEach(() => {
  renderWithRouter(<App />);
});

test(' h2  Encountered pokémons`', () => {
  const text = screen.getByRole('heading',
    {
      level: 2,
      name: /encountered pokémons/i,
    });
  expect(text).toBeInTheDocument();
});
test('ao clicar em prox pokemon imprimir o prox', () => {
  const buttonProx = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  funcaoListaTypesNames().forEach((poke) => {
    const newName = screen.getByText(poke);
    expect(newName).toBeInTheDocument();
    userEvent.click(buttonProx);
  });
});
test('teste se tem os botoes de filtro', () => {
  funcaoListaTypes().forEach((button) => {
    const buttonThere = screen.getByRole('button', {
      name: button,
    });
    expect(buttonThere).toBeInTheDocument();
  });
  const findButtons = screen.getAllByTestId('pokemon-type-button');
  const allButtons = 7;
  expect(findButtons.length).toEqual(allButtons);
});
test('mostrar pokedex só do tipo filtrado', () => {
  console.log(funcaoListaTypes());
  funcaoListaTypes().forEach((typeName) => {
    const buttonType = screen.getByRole('button',
      { name: `${typeName}` });
    const buttonProx = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(buttonType);
    const pokemonsOfType = pokemons.filter((item) => (
      item.type === typeName
    ));
    console.log(pokemonsOfType);
    pokemonsOfType.forEach((poke) => {
      const { name } = poke;
      const getName = screen.getByText(name);
      expect(getName).toBeInTheDocument();
      userEvent.click(buttonProx);
    });
  });
});
test('O botão `All` precisa estar **sempre** visível.', () => {
  const buttonAll = screen.getByRole('button', {
    name: /all/i,
  });
  expect(buttonAll).toBeInTheDocument();
  userEvent.click(buttonAll);
  const buttonProx = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  funcaoListaTypesNames().forEach((name) => {
    const getName = screen.getByText(name);
    expect(getName).toBeInTheDocument();
    userEvent.click(buttonProx);
  });
});
