import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('testando o App ', () => {
  test('ao renderizar a page imprime um h2 Page requested not found `', () => {
    renderWithRouter(<NotFound />);
    const textNotFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(textNotFound).toBeInTheDocument();
  });
  test('img', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(
      /pikachu crying because the page requested was not found/i,
    );
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
