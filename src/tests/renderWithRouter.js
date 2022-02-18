import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

const renderWithRouter = (components) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ components }</Router>),
    history,
  });
};

export default renderWithRouter;
