import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name').innerHTML;
    const type = screen.getByTestId('pokemon-type').innerHTML;
    const weight = screen.getByTestId('pokemon-weight').innerHTML;
    const img = screen.getByAltText(/Pikachu sprite/i);

    expect(img.src).toContain('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(name).toBe('Pikachu');
    expect(type).toBe('Electric');
    expect(weight).toBe('Average weight: 6.0 kg');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link com pokeon id:', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const detailsScreen = screen.getByRole('heading', { name: /pikachu details/i });
    expect(detailsScreen).toBeInTheDocument();
    expect(details).toHaveAttribute('href', '/pokemon/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
    renderWithRouter(<App />);

    const details = screen.getByText(/More details/i);
    userEvent.click(details);

    const favorited = screen.getByText(/Pokémon favoritado?/i);
    userEvent.click(favorited);

    const favorites = screen.getByRole('link', {
      name: 'Favorite Pokémon',
    });
    userEvent.click(favorites);

    const favoritedIcon = screen.getByAltText(/pikachu is marked as favorite/i);

    expect(favoritedIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
