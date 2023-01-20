import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <About.js />. - Requisito 2', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
    renderWithRouter(<App />);

    const about = screen.getByRole('link', {
      name: /about/i,
    });

    act(() => {
      userEvent.click(about);
    });

    const head = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    const paragraph = document.querySelectorAll('p');
    const img = screen.getByRole('img', {
      name: /Pokédex/i,
    });
    expect(head).toBeInTheDocument();
    expect(paragraph.length).toBe(2);
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
