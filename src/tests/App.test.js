import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste do component APP - requisito 1', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
    renderWithRouter(<App />);

    const primeiroLink = screen.getByRole('link', {
      name: /home/i,
    });

    const segundoLink = screen.getByRole('link', {
      name: /About/i,
    });

    const terceiroLink = screen.getByRole('link', {
      name: /Favorite Pokémon/i,
    });

    expect(primeiroLink && segundoLink && terceiroLink).toBeInTheDocument();
  });

  describe('Teste se a aplicação é redirecionada para:', () => {
    test('a página inicial, na URL / ao clicar no link Home', () => {
      renderWithRouter(<App />);

      const home = screen.getByRole('link', {
        name: /home/i,
      });

      userEvent.click(home);

      screen.getByRole('heading', {
        level: 2,
        name: /Encountered Pokémon/i,
      });
    });

    test('a página de About, na URL /about, ao clicar no link About', () => {
      renderWithRouter(<App />);

      const About = screen.getByRole('link', {
        name: /About/i,
      });

      userEvent.click(About);

      screen.getByRole('heading', {
        level: 2,
        name: /About Pokédex/i,
      });
    });

    test('a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon', () => {
      renderWithRouter(<App />);

      const favorites = screen.getByRole('link', {
        name: /Favorite Pokémon/i,
      });

      userEvent.click(favorites);

      screen.getByRole('heading', {
        level: 2,
        name: /Favorite Pokémon/i,
      });
    });
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    // screen.getByRole('heading', {
    //   level: 2,
    //   name: /Encountered Pokémon/i,
    // });

    act(() => {
      history.push('/notFoundPage');
    });

    const notFounder = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(notFounder).toBeInTheDocument();
  });
});
