import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js />. - Requisito 2', () => {
  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/notFoundPage');
    });

    const notFounder = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    const img = document.querySelector('.not-found-image');

    expect(notFounder).toBeInTheDocument();
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
