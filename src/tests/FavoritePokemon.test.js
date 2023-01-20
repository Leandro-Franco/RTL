import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemon.js /> - Requisito 3', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<App />);

    const favorites = screen.getByRole('link', {
      name: 'Favorite Pokémon',
    });
    userEvent.click(favorites);

    screen.getByText(/No favorite Pokémon found/i);
  });

  test('Teste se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const details = screen.getByText(/More details/i);
    userEvent.click(details);

    const favorited = screen.getByText(/Pokémon favoritado?/i);
    userEvent.click(favorited);

    const favorites = screen.getByRole('link', {
      name: 'Favorite Pokémon',
    });
    userEvent.click(favorites);

    const favoritedIcon = document.querySelector('.favorite-icon');

    expect(favoritedIcon).toBeInTheDocument();
  });
});
